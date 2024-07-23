"use client";

import { sidebarLinks } from "@/constants";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';


const LeftSidebar = () => {
   const router = useRouter();
   const userId = localStorage.getItem('userId');

  const handleLogout = () => {
     localStorage.removeItem('authToken');
     localStorage.removeItem('waterIntake');
     localStorage.removeItem('userId');
    
     router.push('/signin');
  };
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
      <div className="hidden lg:flex flex-col items-center bg-white p-4 rounded-lg space-y-4">
      <button 
        onClick={handleLogout} 
        className="text-gray-700 hover:text-white hover:bg-slate-400 px-4 py-2 rounded transition-colors duration-300"
      >
        Logout
      </button>     
        </div>
    </section>
  );
};

export default LeftSidebar;
