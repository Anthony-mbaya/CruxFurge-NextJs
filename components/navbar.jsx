import Link from "next/link";
//import Image from "next/image";
import { ViewIcon } from "lucide-react";

import React from "react";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="bg-white bg-opacity-90 fixed top-0 left-0 z-10 text-sm w-fit">
      <nav className="w-screen px-2 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center justify-center gap-1">
          <img src="/logo.jpeg" alt="logo" className="rounded-full w-10 h-10" />
          <p className="text-[#2565c7] font-extralight[">CruxFurge</p>
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
            <div className="flex justify-center items-center gap-1 text-[0.8rem]">
              <Link href="/events" className="flex justify-center items-center gap-1 text-slate-900"> <ViewIcon size={7} color="green" className="animate-ping" /> events</Link>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit" className="ml-2 border border-[#2565c7] px-1 rounded-sm">login</button>
              </form>
              <Link href="/register" className="border border-[#2565c7] px-1 rounded-sm">create account</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
