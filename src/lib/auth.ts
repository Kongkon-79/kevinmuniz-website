/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          const response = await res.json();

          if (!res.ok || !response?.success) {
            throw new Error(response?.message || "Login failed");
          }

          const { user, accessToken } = response.data;

          return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            accessToken,
            provider: "credentials",
          };
        } catch (error) {
          console.error("Authentication error:", error);
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Authentication failed. Please try again.";
          throw new Error(errorMessage);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.role = user.role;
        token.profileImage = user.profileImage;
        token.accessToken = user.accessToken;
        token.provider = account?.provider || user.provider || "credentials";
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        firstName: token.firstName,
        lastName: token.lastName,
        email: token.email,
        role: token.role,
        profileImage: token.profileImage,
        accessToken: token.accessToken,
        provider: token.provider,
      };
      return session;
    },

    // 🔥 CRITICAL FIX: Extract role from callback URL
    async redirect({ url, baseUrl }) {
      console.log("=== REDIRECT CALLBACK ===");
      console.log("Redirect URL:", url);
      console.log("Base URL:", baseUrl);

      try {
        // Handle relative URLs by making them absolute
        const absoluteUrl = url.startsWith("/") ? `${baseUrl}${url}` : url;
        const redirectUrl = new URL(absoluteUrl);

        console.log("Parsed redirect URL:", redirectUrl.href);
        console.log("Search params:", redirectUrl.searchParams.toString());

        // Extract role from query parameter
        const role = redirectUrl.searchParams.get("google_signup_role");
        console.log("Role from redirect URL:", role);

        if (role && ["player", "gk", "coach", "admin"].includes(role)) {
          console.log("🎯 Valid role found in redirect URL:", role);
          // Store in a global variable that can be accessed in signIn callback
          // This is a workaround since we can't pass data between callbacks easily
          (global as any).__GOOGLE_SIGNUP_ROLE__ = role;
          console.log("✅ Stored role in global variable");
        }
      } catch (error) {
        console.log("❌ Error parsing redirect URL:", error);
      }

      return url;
    },

    // 🔥 FIXED: Get role from global variable (set by redirect) or backend check
    async signIn({ user, account, profile }) {
      console.log("=== SIGNIN CALLBACK START ===");
      console.log("Account provider:", account?.provider);
      console.log("Profile email:", profile?.email);

      if (account?.provider === "google") {
        try {
          let role = "player"; // Default role
          let roleSource = "default";

          // METHOD 1: Try to get role from global variable (set by redirect callback)
          const globalRole = (global as any).__GOOGLE_SIGNUP_ROLE__;
          if (
            globalRole &&
            ["player", "gk", "coach", "admin"].includes(globalRole)
          ) {
            role = globalRole;
            roleSource = "redirect_callback";
            console.log("✅ Got role from redirect callback:", role);
            // Clean up
            delete (global as any).__GOOGLE_SIGNUP_ROLE__;
          }

          // METHOD 2: Check if user already exists in backend
          if (profile?.email) {
            try {
              const checkRes = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-user?email=${encodeURIComponent(profile.email)}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              );

              const checkResponse = await checkRes.json();
              console.log("User check response:", checkResponse);

              // If user exists, use their existing role (LOGIN scenario)
              // This overrides the role from redirect callback
              if (checkResponse?.success && checkResponse?.data?.exists) {
                role = checkResponse.data.role || role;
                roleSource = "existing_user";
                console.log("✅ User exists, using existing role:", role);
              } else if (roleSource === "default") {
                // User doesn't exist and no role from redirect (shouldn't happen in signup flow)
                console.log(
                  "ℹ️ New user with no role specified, using default:",
                  role,
                );
                roleSource = "new_user_default";
              }
            } catch (error) {
              console.log("❌ Error checking user:", error);
            }
          }

          console.log(
            "🎯 Final role to send to backend:",
            role,
            `(source: ${roleSource})`,
          );

          // Call backend Google login endpoint
          console.log("📤 Calling backend with role:", role);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google-login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idToken: account.id_token,
                role: role,
              }),
            },
          );

          const data = await response.json();
          console.log("📥 Backend response:", {
            success: data?.success,
            message: data?.message,
            userRole: data?.data?.user?.role,
          });

          if (!response.ok || !data?.success) {
            console.error("❌ Backend Google login failed:", data);
            return false;
          }

          // Update user object with backend data
          user.id = data.data.user._id;
          user.firstName = data.data.user.firstName;
          user.lastName = data.data.user.lastName;
          user.email = data.data.user.email;
          user.role = data.data.user.role;
          user.profileImage = data.data.user.profileImage;
          user.accessToken = data.data.accessToken;

          console.log("✅ Google signIn successful!");
          console.log("User role:", user.role);

          return true;
        } catch (error) {
          console.error("❌ Google signIn callback error:", error);
          return false;
        }
      }
      return true;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  // Enable debug logging
  debug: true,
};

// old code

// import { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text", placeholder: "email" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "password",
//         },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Please enter your email and password");
//         }

//         try {
//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 email: credentials.email,
//                 password: credentials.password,
//               }),
//             }
//           );

//           const response = await res.json();

//           console.log("response", response);

//           if (!res.ok || !response?.success) {
//             throw new Error(response?.message || "Login failed");
//           }
//         //   if (response.data.user.role === "USER") {
//         //     throw new Error("Only admin can access this page");
//         //   }
//           const { user, accessToken } = response.data;

//           return {
//             id: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             role: user.role,
//             profileImage: user.profileImage,
//             accessToken,
//           };
//         } catch (error) {
//           console.error("Authentication error:", error);
//           const errorMessage =
//             error instanceof Error
//               ? error.message
//               : "Authentication failed. Please try again.";
//           throw new Error(errorMessage);
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     async jwt({ token, user }: { token: JWT; user?: any }) {
//       if (user) {
//         token.id = user.id;
//         token.firstName = user.firstName;
//         token.lastName = user.lastName;
//         token.email = user.email;
//         token.role = user.role;
//         token.profileImage = user.profileImage;
//         token.accessToken = user.accessToken;
//       }
//       return token;
//     },

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     async session({ session, token }: { session: any; token: JWT }) {
//       session.user = {
//         id: token.id,
//         firstName: token.firstName,
//         lastName: token.lastName,
//         email: token.email,
//         role: token.role,
//         profileImage: token.profileImage,
//         accessToken: token.accessToken,
//       };
//       return session;
//     },
//   },
// };
