import React from "react";
import { Suspense } from "react";
import {client} from "@/sanity/lib/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { TECH_EVENT_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/view";

export const experimental_ppr = true;

const EventDetails = async ({ params }: {params: Promise<{id:string}>}) =>{
    const id = (await params).id;

    const post = await client.fetch(TECH_EVENT_BY_ID, {id});
    if(!post) return notFound();

    return(
        <div className='pt-[3.6rem] sm:pt-[5rem] px-2 sm:px-10 md:px-28 lg:px-44 py-1 sm:py-10 flex flex-col gap-2 bg-gray-200'>
        <h1 className='text-xl font-bold'>Event Details - "{post.title}"</h1>
        <p className="text-[0.8rem]">Created: {formatDate(post?._createdAt)}</p>
        <p>{post.category}</p>
        <div className='bg-white py-3 px-1 rounded-sm shadow-sm text-slate-900 font-semibold'>{ post.description }</div>
        <Image src={post.image} alt="details image" width={600} height={200} className="w-full h-auto mx-auto md:w-[50rem] " />
        <div className="bg-white py-3 px-1 rounded-sm shadow-sm text-slate-900 font-semibold flex flex-col gap-1">

            <span>Date: {post.dateTime} </span>
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