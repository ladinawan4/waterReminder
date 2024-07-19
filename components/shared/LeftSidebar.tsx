"use client";

import { sidebarLinks } from "@/constants";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
 

const LeftSidebar = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  const pathname = usePathname();
  return (
    <section
      className="background-light900_dark200 light-border
    sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto
    border-r p-6 pt-36 shadow-light-300 dark:shadow-none
    max-sm:hidden lg:w-[340px] custom-scrollbar"
      id="LeftSidebar"
    >
      <div className="flex flex-1 flex-col gap-6">
        <p className="text-color-menu">Menu</p>
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            }
          }

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 p-4 rounded-lg
              hover:bg-transparent/5`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center bg-white p-4 rounded-lg space-x-4 sm:hidden md:hidden lg:flex">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <div>
          <div className="text-lg font-semibold">{user?.firstName} {user?.lastName}</div>
          <div className="text-gray-500">{user?.primaryEmailAddress?.emailAddress}</div>
        </div>
      
      </div>
    </section>
  );
};

export default LeftSidebar;
