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
    <section className="container w-screen">
      <section className="search_input fixed top-[3.65rem] left-0 w-screen "> 
        <SearchInput search={searchQuery} />
      </section>
      <section className="cards-container mt-[5.3rem] flex flex-wrap border-2 border-green-500">
        <p>{searchQuery ? `Results for ${searchQuery}` : "all events"}</p>
        <ul className="w-screen flex flex-wrap gap-3">
          {
            posts?.length > 0 ? (
              posts.map((post: EventTypeCard) => (
              <EventCard key={post?._id} post={post} />))
            ) : (
              <p>No events found</p>
            )
          }
        </ul>
      </section>
      <SanityLive />
    </section>
  );
}
