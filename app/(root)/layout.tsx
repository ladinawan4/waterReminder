

import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import RightSidebar from "@/components/shared/RightSidebar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Water Reminder",
  description: "Water Reminder.",
  icons: {
    icon: "/assets/icons/waterminder-app-icon.png",
  },
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="bg-white flex min-h-screen flex-1 flex-col px-6 pb-6 max-md:pb-14 sm:px-14">
          <div className="max-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
