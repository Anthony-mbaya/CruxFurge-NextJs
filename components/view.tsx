import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { TECH_EVENTS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export default async function View({id}: {id:string}){
    const { views: totalViews } = await client.withConfig({useCdn:false})
    .fetch(TECH_EVENTS_VIEWS_QUERY, {id})
    //await writeClient.patch(id).set({views: totalViews + 1}).commit()

    const updatedRecord = await writeClient.patch(id).set({ views: totalViews + 1 }).commit();
    /*
            // Post-update logic directly
    console.log('Views updated:', updatedRecord.views);
            // Add additional logic here
    //console.error('Error updating views:');
    */
    return(
        <div className="border border-red-500 w-fit h-fit fixed bottom-2 right-1">
            <span>
                <Ping />
            </span>
            <p>views: {updatedRecord.views}</p>
        </div>
    )
}