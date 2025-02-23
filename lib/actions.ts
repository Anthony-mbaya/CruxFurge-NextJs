"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
//import slugify from "slugify";
export const createPitch = async (
    state: any,
    form:FormData,
    pitch: string,
 ) => {
    const session = await auth();

    if(!session) return parseServerActionResponse({
        error: 'not signed in',
        status:"ERROR",
    });
    const { title, description, category, img_link, dateTime } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );
     //const slug = slugify(title as string, { lower: true, strict: true });

    try{
        const event = {
            title,
            description,
            category,
            image: img_link,
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            pitch,
            dateTime,
        };
        const result = await writeClient.create({_type:'tech-events',...event});
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS',
        });
    }catch(error){
        console.log(error);
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
          });
    }
}
