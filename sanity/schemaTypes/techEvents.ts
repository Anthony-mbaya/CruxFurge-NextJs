import { defineField, defineType } from "sanity";

export const techEvents = defineType(
    {
        name: 'tech-events',
        title: 'Tech-Events',
        type: 'document',
        fields: [
            defineField(
                {
                    name: 'title',
                    type: 'string',
                }
            ),
            defineField(
                {
                    name: 'author',
                    type: 'reference',
                    to: { type: 'author' },
                }
            ),
            defineField({
                name: "views",
                type: "number",
              }),
            defineField(
                {
                    name: 'description',
                    type: 'text',
                }
            ),
            defineField(
                {
                    name: 'category',
                    type: 'string',
                    validation: (Rule) => Rule.min(1).max(20).required().error('PLease Ener category'),
                }
            ),
            defineField(
                {
                    name: 'image',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                }
            ),
            defineField(
                {
                    name: 'dateTime',
                    type: 'string',
                }
            ),
            defineField(
                {
                    name: 'pitch',
                    type: 'markdown',
                }
            ),
        ],
    }
)