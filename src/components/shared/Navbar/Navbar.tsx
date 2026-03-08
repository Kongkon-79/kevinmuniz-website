


"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
// import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  // DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import LogoutModal from "@/components/modals/LogoutModal"
import { toast } from "sonner"
// import { useRouter } from "next/navigation"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  const [open, setOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  // const router = useRouter()


  const session = useSession()
  const status = session?.status
  const user = session?.data?.user

  

  const handLogout = async () => {
    try {
      toast.success("Logout successful!")
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Logout failed. Please try again.")
    }
  }

  return (
    <div className="sticky top-0 z-50">
      <header className="w-full bg-[#F5FAFF]">
        <nav className="container mx-auto px-4 py-3 ">
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-10 md:gap-12 lg:gap-14">
              {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                width={1000}
                height={1000}
                className="w-auto h-[56px] object-contain"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-5">
              <Link
                href="/"
                className={`text-sm md:text-[15px] hover:text-primary leading-[150%] text-[#131313] font-normal transition-all ease-in-out duration-300 ${pathname === "/" ? "border-b-[2px] border-primary" : "border-0"
                  }`}
              >
                Home
              </Link>

              <Link
                href="/how-it-works"
                className={`text-sm md:text-[15px] hover:text-primary leading-[150%] text-[#131313] font-normal transition-all ease-in-out duration-300 ${pathname === "/services" ? "border-b-[2px] border-primary" : "border-0"
                  }`}
              >
                How it works
              </Link>

              <Link
                href="/community"
                className={`text-sm md:text-[15px] hover:text-primary leading-[150%] text-[#131313] font-normal transition-all ease-in-out duration-300 ${pathname === "/profiles" ? "border-b-[2px] border-primary" : "border-0"
                  }`}
              >
                Community
              </Link>


              <Link
                href="/contact-us"
                className={`text-sm md:text-[15px] hover:text-primary leading-[150%] text-[#131313] font-normal transition-all ease-in-out duration-300 ${pathname === "/prices" ? "border-b-[2px] border-primary" : "border-0"
                  }`}
              >
                Contact
              </Link>

            </div>
            </div>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
              {status === "authenticated" && user ? (
                <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
                  <DropdownMenuTrigger>
                    <Image
                      src="/assets/images/no-user.jpg"
                      alt="user-img"
                      width={200}
                      height={200}
                      className="w-14 h-14 rounded-full border object-contain"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2 border-none bg-white">
                    <Link href="/profile">
                      <DropdownMenuLabel className="cursor-pointer text-base md:text-lg text-[#131313] leading-[120%] font-medium hover:text-primary">
                        Profile
                      </DropdownMenuLabel>
                    </Link>
                    <Link href="/password-change">
                      <DropdownMenuLabel className="cursor-pointer text-base md:text-lg text-[#131313] leading-[120%] font-medium hover:text-primary">
                        Password Change
                      </DropdownMenuLabel>
                    </Link>
                    <DropdownMenuLabel
                      onClick={() => setLogoutModalOpen(true)}
                      className="flex items-center gap-2 cursor-pointer text-base md:text-lg text-[#B70000] leading-[120%] font-medium hover:text-red-800"
                    >
                      <LogOut className="w-5 h-5 " /> Logout
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-[44px] text-base text-[#131313] font-normal leading-[150%] border-[2px] border-[#131313] py-2 px-5 rounded-full"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button
                      size="sm"
                      className="h-[44px] py-2 px-5 rounded-full bg-primary hover:bg-primary/90 text-white text-base font-normal leading-[150%] "
                    >
                      Start fundraising
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="mt-4 md:hidden flex flex-col space-y-3 pb-4">

              <Link
                href="/"
                className={`w-fit text-sm md:text-base hover:text-primary leading-[150%] text-[#131313] font-normal transition-all ease-in-out duration-300 ${pathname === "/" ? "border-b-[2px] border-primary" : "border-0"
                  }`}
              >
                Home
              </Link>

              <Link
                href="/services"
                className={`w-fit text-sm md:text-base hover:text-primary leading-[150%] text-[#131313] font-normal transition-all ease-in-out duration-300 ${pathname === "/services" ? "border-b-[2px] border-primary" : "border-0"
                  }`}
              >
                Services
              </Link>
              <Link
                href="/profiles"
                className={`w-fit text-sm md:text-base hover:text-primary leading-[150%] text-[#131313] font-normal transition-all ease-in-out duration-300 ${pathname === "/profiles" ? "border-b-[2px] border-primary" : "border-0"
                  }`}
              >
                Profiles
              </Link>

              <Link
                href="/analytic-soccer-coming-soon"
                className={`w-fit text-sm md:text-base hover:text-primary leading-[150%] text-[#131313] font-normal transition-all ease-in-out duration-300 ${pathname === "/analytic-soccer-coming-soon" ? "border-b-[2px] border-primary" : "border-0"
                  }`}
              >
                Player Evaluation Program
              </Link>

              <Link
                href="/prices"
                className={`w-fit text-sm md:text-base hover:text-primary leading-[150%] text-[#131313] font-normal transition-all ease-in-out duration-300 ${pathname === "/prices" ? "border-b-[2px] border-primary" : "border-0"
                  }`}
              >
                Prices
              </Link>


              <div className="flex items-center justify-between gap-4 pt-2">
                {status === "authenticated" && user ? (
                  <DropdownMenu
                    open={mobileDropdownOpen}
                    onOpenChange={setMobileDropdownOpen}
                    modal={false}
                  >
                    <DropdownMenuTrigger>
                      <Image
                        src={user?.profileImage || "/assets/images/no-user.jpg"}
                        alt="user-img"
                        width={200}
                        height={200}
                        className="w-14 h-14 rounded-full border object-contain"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2 bg-white border-white">
                      <Link
                        href="/profile"
                        onClick={() => {
                          setIsOpen(false)
                          setMobileDropdownOpen(false)
                        }}
                      >
                        <DropdownMenuLabel className="cursor-pointer text-base md:text-lg text-[#131313] leading-[120%] font-medium hover:text-primary">
                          Profile
                        </DropdownMenuLabel>
                      </Link>
                      <Link
                        href="/password-change"
                        onClick={() => {
                          setIsOpen(false)
                          setMobileDropdownOpen(false)
                        }}
                      >
                        <DropdownMenuLabel className="cursor-pointer text-base md:text-lg text-[#131313] leading-[120%] font-medium hover:text-primary">
                          Password Change
                        </DropdownMenuLabel>
                      </Link>
                      <DropdownMenuLabel
                        onClick={() => setLogoutModalOpen(true)}
                        className="flex items-center gap-2 cursor-pointer text-base md:text-lg text-[#B70000] leading-[120%] font-medium hover:text-red-800"
                      >
                        <LogOut className="w-5 h-5 " /> Logout
                      </DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href="/login">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-[40px] text-base text-[#131313] font-normal leading-[150%] border-[2px] border-[#131313] py-2 px-9 rounded-full"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button
                        size="sm"
                        className="h-[40px] py-2 px-9 rounded-full bg-primary hover:bg-primary/90 text-white text-base font-normal leading-[150%] "
                      >
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {logoutModalOpen && (
        <LogoutModal
          isOpen={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handLogout}
        />
      )}
    </div>
  )
}

export default Navbar