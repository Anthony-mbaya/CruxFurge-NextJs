import { defineQuery } from "next-sanity";

export const TECH_EVENTS_QUERY = defineQuery(`*[_type == "tech-events" && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc){
    _id,
    title,
    _createdAt,
    author -> {
        _id, name, image, bio
    },
    views,
    description,
    category,
    image
    } `);


export const TECH_EVENT_BY_ID =
defineQuery(`*[_type == "tech-events" && _id == $id][0] {
    _id,
    title,
    _createdAt,
    author -> {
        _id, name,username, image, bio
    },
    views,
    description,
    category,
    image,
    pitch
    }`);

export const TECH_EVENTS_VIEWS_QUERY =
defineQuery(`*[_type == "tech-events" && _id < $id][0] {
    _id,
    views
    }`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
    `*[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        username,
        image,
        bio
    }`
)