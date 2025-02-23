import React from "react";
import Ping from "@/components/Ping";
import { client } from "@/sanity/lib/client";
import { TECH_EVENTS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({id}: {id:string}) =>{
    const data = await client
    .withConfig({useCdn:false})
    .fetch(TECH_EVENTS_VIEWS_QUERY, {id});
    //await writeClient.patch(id).set({views: totalViews + 1}).commit()

    const totalViews = data?.views || 0;

    //const {views:totalViews} = data;
    await writeClient
    .patch(id)
    .setIfMissing({ views: 0 })
    .inc({ views: 1 })
    .commit();
    /*
            // Post-update logic directly
    console.log('Views updated:', updatedRecord.views);
            // Add additional logic here
    //console.error('Error updating views:');
    */
    return(
        <div className="border border-red-500 w-fit h-fit fixed bottom-2 right-1 px-4">
            <span>
                <Ping />
            </span>
            <p>views: {totalViews + 1}</p>
        </div>
    )
}
export default View;
