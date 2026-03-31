export interface UserAddress {
  country: string;
  cityState: string;
  roadArea: string;
  postalCode: string;
  taxId: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  dob: string | null;
  gender: string;
  role: string;
  profileImage: string;
  bio: string;
  jobRole?: string;
  imdbLink?: string;
  cv?: string;
  isLive?: boolean;
  language: string;
  isVerified: boolean;
  hasActiveSubscription: boolean;
  address: UserAddress;
}

export interface UserProfileResponse {
  status: boolean;
  message: string;
  data: UserProfile;
}

export interface UpdateProfilePayload {
  name?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
  bio?: string;
  jobRole?: string;
  imdbLink?: string;
  cv?: string;
  isLive?: boolean;
  dob?: string | null;
  address?: Partial<UserAddress>;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
}
