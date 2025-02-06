import React from "react";
import { client } from "@/sanity/lib/client";
import { TECH_EVENTS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import EventCard, {EventTypeCard} from "@/components/event-card";
const UserEvents = async ({ id }: { id: string }) => {
	const events = await client.fetch(TECH_EVENTS_BY_AUTHOR_QUERY, {id});
	return(
		<>
  {events.length > 0 ? (
    events.map((event: EventTypeCard) => (
      <EventCard key={event._id} post={event} />
    ))
  ) : (
    <p>no posts</p>
  )}
</>
		)
}
export default UserEvents;