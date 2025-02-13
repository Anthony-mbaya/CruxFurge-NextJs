"use client";
import React from "react";
import Link from "next/link";
import { SquareX } from 'lucide-react';

export default function SearchReset(){
    const reset =()=> {
        const input = document.querySelector("search-input");
        if(input) input.reset();
    }
    return(
        <button type="reset" onClick={reset}>
            <Link href="/" ><SquareX size={16} color="blue" /></Link>
        </button>
    )
}