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
        <>
        <h1>Event Details</h1>
        <h2>{post.title}</h2>
        <p>{formatDate(post?._createdAt)}</p>
        <p>{ post.description }</p>
        <img src={post.image} alt="posrt image" />
        <Link href={`/user/${post.author?._id}`} >
        <Image
            src={post.author.image}
            className="rounded-full"
            alt="avatar"
            width={64}
            height={64}
            priority
        />
        </Link>
        <p>{post.author.name}</p>
        <p>{post.author.username}</p>
        <p>{post.category}</p>
        <p>{post.pitch}</p>

        <Suspense fallback={<Skeleton />}>
            <View id={id} />
        </Suspense>
        </>
    )
}

export default EventDetails;