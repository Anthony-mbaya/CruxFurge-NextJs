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
  } = post;
  //console.log(`/user/${author?.image}`);
  return (
    <li className="event-card rounded-md border border-[#2565c7] p-2">
      <div className="flex justify-between">
        <p className="date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1 justify-center items-center">
          <EyeIcon size={16} color="blue" />
          <span>{views}</span>
        </div>
      </div>
      <div>
        <Link href={`/user/${author?._id}`}>
          <p className="author text-sm italic text-blue-600">{author?.name}</p>
        </Link>
        <Link href={`/events/${_id}`}>
          <h2 className="font-bold">{title}</h2>
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
        <Link href={`/events/${_id}`}>
        <p>{description}</p>
        <Image src={image || "image"} width={200} height={200} alt="fdfds" />
        </Link>
        <div className="flex justify-between">
          <Link href={`/?query=${category?.toLowerCase()}`}>
          <p>{category}</p>
          </Link>
          <Button asChild>
            <Link href={`/events/${_id}`}>
            More
            </Link>
          </Button>
        </div>
      </div>
    </li>
  );
}
