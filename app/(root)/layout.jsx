import React from "react";
import Navbar from "@/components/navbar";
export default function Layout({ children }) {
  return (
    <main className="max-w-screen">
      <Navbar />
      {children}
    </main>
  );
}
