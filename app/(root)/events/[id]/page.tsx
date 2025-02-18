import React from "react";
import { Suspense } from "react";
import {client} from "@/sanity/lib/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { TECH_EVENT_BY_ID } from "@/sanity/lib/queries";
//import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/view";

export const experimental_ppr = true;

const EventDetails = async ({ params }: {params: Promise<{id:string}>}) =>{
    const id = (await params).id;

    const post = await client.fetch(TECH_EVENT_BY_ID, {id});
    if(!post) return notFound();
    return(
        <div className='pt-[3.6rem] px-2 py-1 flex flex-col gap-2 bg-gray-200 h-screen'>
        <h1 className='text-xl font-bold'>Event Details - "{post.title}"</h1>
        <p className="text-[0.8rem]">Created: {formatDate(post?._createdAt)}</p>
        <p>{post.category}</p>
        <div className='bg-white py-3 px-1 rounded-sm shadow-sm text-slate-900 font-semibold'>{ post.description }</div>
        <img src={post.image} alt="details image" />
        <div className="bg-white py-3 px-1 rounded-sm shadow-sm text-slate-900 font-semibold flex flex-col gap-1">
            <span>Location: set location </span>
            <span>Date: set date </span>
            <span>Venue: set venue </span>
        </div>
        <div className="bg-white">{post.pitch}</div>
        <div className="flex flex-col gap-2">
        <h2 className="text-[0.8rem] font-semibold">Author: </h2>
        <Link href={`/user/${post.author?._id}`} className="flex flex-row gap-2 items-center" >
        <img
            src={post.author.image}
            className="rounded-full w-10 h-10" 
        />
        <p>{post.author.username}</p>
        </Link>
        </div> 
        <Suspense fallback={<Skeleton />}>
            <View id={id} />
        </Suspense>
        </div>
    )
}

export default EventDetails;