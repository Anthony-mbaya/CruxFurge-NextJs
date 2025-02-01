"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";

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
    const { title, description, category, img_link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch"),
    );

    try{
        const event = {
            title,
            description,
            category,
            image: img_link,
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch,
        };
        const result = await writeClient.create({_type:'event',...event});
        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        });
    }catch(error){
        console.log(error);

    }
}