import React from "react";
import Navbar from "@/components/navbar";
export default function Layout({ children }) {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
    </main>
  );
}
