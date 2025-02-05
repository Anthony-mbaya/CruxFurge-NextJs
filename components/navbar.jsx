import Link from "next/link";
//import Image from "next/image";

import React from "react";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <img src="/images.jpeg" alt="logo" width={144} height={30} />
        </Link>
        {/* links */}
        <div className="links text-black">
          {session && session?.user ? (
            <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-4">
              <Link href="/events">events</Link>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit">Login</button>
              </form>
              <Link href="/register">register</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
