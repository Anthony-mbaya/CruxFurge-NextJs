import React from "react";
import SearchInput from "@/components/search";
import EventCard, { EventTypeCard } from "@/components/event-card";
import { TECH_EVENTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { auth } from "@/auth";
//seachParams - represents query parameters extracted from the URL
export default async function Home({ searchParams }: {searchParams: { query:string }}) {
  //query parameter is extracted from searchParams.
  const searchQuery = (await searchParams).query;
  const params = { search: searchQuery || null };
  //const posts = await client.fetch(TECH_EVENTS_QUERY)
  const { data:posts } = await sanityFetch({query: TECH_EVENTS_QUERY, params})
  //console.log(JSON.stringify(posts, null, 2));
  const session = await auth();
  console.log(session?.id);
  /*
  const posts = [
    {
      _createdAt: new Date(),
      views: 45,
      author: {_id:1, name: "Anthony"},
      _id: 1,
      description: "this is descriotion",
      image: "https://t4.ftcdn.net/jpg/02/45/63/69/360_F_245636933_kY23ohGptK5t6n8wGSXIgLgVXWeHJRct.jpg",
      category: "Cybersecurity",
      title: "Data Security",
    },
    {
      _createdAt: new Date(),
      views: 65,
      author: {_id:2, name:"Elon"},
      _id: 2,
      description: "this is descriotion",
      image: "https://media.gettyimages.com/id/1420039900/photo/cyber-security-ransomware-email-phishing-encrypted-technology-digital-information-protected.jpg?s=170667a&w=gi&k=20&c=fIbligQdX9o3NAhebQdxK4rqsXXV2OipSteuxFTMeYU=",
      category: "Cybersecurity",
      title: "Data Security",
      },
      {
        _createdAt: new Date(),
        views: 78,
        author: {_id:3, name:'Filister'},
        _id: 3,
        description: "this is descriotion",
        image: "https://yt3.googleusercontent.com/YnI5jfi-z7JoHDe8xYjevL4Y-ceckcsDVy0MH6D1NvkGiv4-sK6xW5FMF7dNiv0b1P1Fq8aQKw=s900-c-k-c0x00ffffff-no-rj",
        category: "Cybersecurity",
        title: "Data Security",
        },
  ]
        */

  return (
    <>
      <section className="header-section">
        <h1 className="heading text-white">CruxFurge</h1>
        <SearchInput search={searchQuery} />
      </section>
      <section className="cards-container">
        <p>{searchQuery ? `Results for ${searchQuery}` : "all events"}</p>
        <ul className="cards flex gap-3">
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
    </>
  );
}
