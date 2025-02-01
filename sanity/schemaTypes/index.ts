import { type SchemaTypeDefinition } from 'sanity'

import { author } from "@/sanity/schemaTypes/author";
import { techEvents } from "@//sanity/schemaTypes/techEvents";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, techEvents],
}
