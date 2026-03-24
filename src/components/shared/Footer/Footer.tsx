import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="">
      <div className="bg-primary py-8 md:py-10">
        <div className="container flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 lg:gap-28">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/images/logo.png"
                alt="Hierarchy of visionaries"
                width={1000}
                height={1000}
                className="h-[68px] w-auto object-contain md:h-[78px]"
              />
            </Link>
          </div>
          <div>
            <ul className="flex items-center gap-6 md:gap-8 lg:gap-10">
              <Link href="/terms-of-service">
                <li className="text-base md:text-lg font-semibold text-white leading-[120%] hover:underline">
                  Terms Of Service
                </li>
              </Link>
              <Link href="/privacy-policy">
                 <li className="text-base md:text-lg font-semibold text-white leading-[120%] hover:underline">
                  Privacy Policy
                </li>
              </Link>
            </ul>
            <ul className="flex items-center gap-6 md:gap-8 lg:gap-10 pt-6">
              <Link href="/">
                <li className="text-base md:text-lg font-semibold text-white leading-[120%] hover:underline">
                  Home
                </li>
              </Link>
              <Link href="/how-it-works">
                 <li className="text-base md:text-lg font-semibold text-white leading-[120%] hover:underline">
                  How It Works
                </li>
              </Link>
              <Link href="/community">
                 <li className="text-base md:text-lg font-semibold text-white leading-[120%] hover:underline">
                  Community
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      {/* footer bottom  */}
      <p className="container text-base md:text-lg font-medium text-center text-[#131313] leading-[120%] py-6 md:py-8 ">
        Copyright © {new Date().getFullYear()}. Hierarchy of visionaries. All
        rights reserved.
      </p>
    </div>
  );
};

export default Footer;
