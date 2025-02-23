import React from "react";
import { auth } from "@/auth";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserEvents from "@/components/user-events";
import { Suspense } from "react";
export const experimental_ppr = true;

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;
	const session = await auth();
	const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id});
	if(!user) return notFound();
	return (
		<div className='w-full pt-[3.6rem] sm:pt-[5rem] px-2 sm:px-5 flex flex-col gap-2'>
		<div className='flex flex-row items-center justify-between'>
			<span className='flex flex-row gap-1 items-center'>
				<img
			src={user.image}
			alt={user.name}
			className="w-10 h-10 rounded-full"
			/>
			<h3>{user.name}</h3>
			</span>
			<p>@{user?.username}</p>
		</div>
		<div className="bg-white rounded-sm px-1 py-3">{user?.bio}</div>
		<div>
			<p className="text-center">
				{
					session?.id === id ? "Your " : `All ${user.name}'s`
				} Tech Events
			</p>
			<ul className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-3" >
			<Suspense fallback={<p>loading...</p>}>
			<UserEvents id={id} />
			</Suspense>
			</ul>
		</div>
	</div>
	)

}

export default UserPage;