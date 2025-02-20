import Link from "next/link";
//import Image from "next/image";
import { ViewIcon } from "lucide-react";

import React from "react";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="">
      <nav className="w-full bg-white bg-opacity-90 fixed top-0 left-0 z-10 text-sm px-2 sm:px-9 md:px-12 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center justify-center gap-1">
          <img src="/logo.jpeg" alt="logo" className="rounded-full w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14" />
          <p className="text-[#2565c7] sm:text-[0.9rem] sm:text-[1.1rem] font-extralight[">CruxFurge</p>
        </Link>
        {/* links */}
        <div className="links text-[#2565c7]">
          {session && session?.user ? (
            <div className="flex justify-center items-center gap-2">
              <Link href="/events/create">create</Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button>Logout</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1 sm:gap-2 sm:gap-3 text-[0.8rem] sm:text-[0.9rem] md:text-[1rem]">
              <Link href="/" className="flex justify-center items-center gap-1 sm:gap-2 text-slate-900"> <ViewIcon size={7} color="green" className="animate-ping" /> events</Link>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit" className="ml-2 border border-[#2565c7] px-1 sm:px-2 sm:py-1 hover:bg-slate-200 rounded-sm">login</button>
              </form>
              <Link href="/register" className="border border-[#2565c7] px-1 sm:px-2 sm:py-1 hover:bg-slate-200 rounded-sm">create account</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
