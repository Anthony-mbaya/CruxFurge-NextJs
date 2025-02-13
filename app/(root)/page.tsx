import React from "react";
import SearchInput from "@/components/search";
import EventCard, { EventTypeCard } from "@/components/event-card";
import { TECH_EVENTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { auth } from "@/auth";
//seachParams - represents query parameters extracted from the URL
export default async function Home({ searchParams }: {searchParams: Promise<{ query?:string }>}) {
  //query parameter is extracted from searchParams.
  const searchQuery = (await searchParams).query;
  const params = { search: searchQuery || null };
  const session = await auth();
  console.log(session?.id);
  //const posts = await client.fetch(TECH_EVENTS_QUERY)
  const { data:posts } = await sanityFetch({query: TECH_EVENTS_QUERY, params})
  //console.log(JSON.stringify(posts, null, 2));

  return (
    <section className="w-fit">
      <section className="search_input w-full fixed top-[3.66rem] left-0 ">
        <SearchInput search={searchQuery} />
      </section>
      <section className="cards-container w-screen mt-[5.3rem] flex flex-col gap-0 px-2">
        <p className="text-sm text-center text-slate-900 opacity-30">{searchQuery ? `search results for "${searchQuery}"` : "all events"}</p>
        <ul className="w-full grid grid-cols-1 mx-auto items-center justify-center gap-3">
          {
            posts?.length > 0 ? (
              posts.map((post: EventTypeCard) => (
              <EventCard key={post?._id} post={post} />))
            ) : (
              <p className="text-sm text-red-600">No events found</p>
            )
          }
        </ul>
      </section>
      <SanityLive />
    </section>
  );
}
