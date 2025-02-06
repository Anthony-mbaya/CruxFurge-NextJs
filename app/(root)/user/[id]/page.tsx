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
	return (<>
		<h3>{user.name}</h3>
		<Image
		src={user.image}
		alt={user.name}
		width={220}
		height={220}
		/>
		<p>@{user?.username}</p>
		<p>{user?.bio}</p>
		<div>
			<p>
				{
					session?.id === id ? "Your " : "All "
				} Tech Events
			</p>
			<ul>
			<Suspense fallback={<p>loaidn...</p>}>
			<UserEvents id={id} />
			</Suspense>
			</ul>
		</div>

	</>)

}

export default UserPage;