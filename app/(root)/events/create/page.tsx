import { auth } from "@/auth";
import EventsForm from "@/components/events-form";
import { redirect } from "next/navigation";
import React from "react";

export default async function Create(){
    const session = await auth();
    if(!session) redirect('/');
    return(
        <section>
            <h1>Create event</h1>
            <EventsForm />
        </section>
    )
}