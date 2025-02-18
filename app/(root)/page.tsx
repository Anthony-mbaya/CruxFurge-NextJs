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
    <section className="container w-full mx-auto">
      <section className="search_input w-full fixed top-[3.66rem] sm:top-[4.5rem] md:top-[5rem] left-0 ">
        <SearchInput search={searchQuery} />
      </section>
      <section className="cards-container mt-[5.3rem] sm:mt-[6.7rem] md:mt-[7.2rem] mx-auto flex flex-col gap-0 px-2">
        <p className="text-sm text-center text-slate-900 opacity-30">{searchQuery ? `search results for "${searchQuery}"` : "all events"}</p>
        <ul className="border border-red-500 sm:border-green-500 md:border-black lg:border-yellow-500 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-3">
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
