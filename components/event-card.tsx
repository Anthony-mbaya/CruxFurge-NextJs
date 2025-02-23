import { formatDate } from "@/lib/utils";
import React from "react";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";


export type EventTypeCard = Omit<import("@/sanity/types").TechEvents, "author"> & {author?:import("@/sanity/types").Author}

export default function EventCard({ post }: { post: EventTypeCard}) {
  const {
    _createdAt,
    views,
    author,
    _id,
    description,
    image,
    category,
    title,
    dateTime,
  } = post;
  console.log(dateTime);
  return (
    <li className="event-card mx-auto max-w-sm h-full rounded-md border border-[#2565c7] p-2 flex flex-col justify-between">
      <div className="flex justify-between text-sm">
        <p className="date">Created: {formatDate(_createdAt)}</p>
        <div className="flex flex-row gap-1 justify-center items-center">
          <EyeIcon size={16} color="blue" />
          <span>{views}</span>
        </div>
      </div>
      <Link href={`/events/${_id}`}>
        <Image src={image || "image"} alt="event post" width={600} height={200} className="w-full h-auto mx-auto" />
      </Link>
      <Link href={`/events/${_id}`}>
        <h2 className="font-bold text-xl">{title}</h2>
      </Link>
      <Link href={`/?query=${category?.toLowerCase()}`}>
          <p>{category}</p>
      </Link>
      <p>Time: {dateTime}</p>
      <p className="line-clamp-2">{description}</p>
      <div className="mt-2 mb-2 flex flex-row-reverse items-center justify-end gap-1">
        <Link href={`/user/${author?._id}`}>
          <p className="author text-sm italic text-blue-600">{author?.name}</p>
        </Link>
        <Link href={`/user/${author?._id}`}>
          {author?.image ? (
              <Image
                src={author.image}
                alt={author?.name || "Author profile picture"}
                width={40}
                height={40}
                className="rounded-full"
              />
          ) : null}
        </Link>
        </div>
        <div>
          <Button asChild className="w-full">
            <Link href={`/events/${_id}`}>
            More
            </Link>
          </Button>
      </div>
    </li>
  );
}
