import React from "react";
import Image from "next/image";
import Link from "next/link";
import GlobalSearch from "../search/GlobalSearch";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.png"
          width={100}
          id="Logosidebar"
          height={100}
          alt="WaterReminder"
        />
      </Link>
    
      <h3 className="text-color hidden lg:block">
        Welcome back <b>Mathew!</b>
      </h3>
      <GlobalSearch />
      <div className="flex items-center space-x-2 text-blue-700 hidden lg:block">
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-6 8h6m2 8H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z" />
        </svg> */}
        <input type="date" className="border-none bg-transparent text-blue-700 focus:outline-none" />
    </div>
    <MobileNav />
    </nav>
    
  );
};

export default Navbar;
