"use client";
import React from "react";
import Link from "next/link";

export default function SearchReset(){
    const reset =()=> {
        const input = document.querySelector("search-input");
        if(input) input.reset();
    }
    return(
        <button type="reset" onClick={reset}>
            <Link href="/" >X</Link>
        </button>
    )
}