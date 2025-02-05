"use client";
import React, { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import MDEditor from "@uiw/react-md-editor";

export default function EventsForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("hello");
  const { toast } = useToast();
  const router = useRouter(); 
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        img_link: formData.get("img_link") as string,
        pitch, 
      };
      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);
      //console.log(formValues);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Ypur event has been created successful",
        });
        router.push(`/events/${result._id}`);
      }
      //console.log("eee:", result._id)
      //console.log(result);


      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check inputs an try egein",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "nexpected error occured",
        variant: "destructive",
      });
      return {
        ...prevState,
        error: "unexpected error occured",
        status: "ERROR",
      };
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="title">Title</label>
        <Input id="title" name="title" required placeholder="event title" />
        {errors.title && <p>{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="event description"
        />
        {errors.description && <p>{errors.description}</p>}
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <Input
          id="category"
          name="category"
          required
          placeholder="category: data security"
        />
        {errors.category && <p>{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="img_link">Image Url</label>
        <Input id="img_link" name="img_link" required placeholder="img_link" />
        {errors.img_link && <p>{errors.img_link}</p>}
      </div>
      <div>
        <label htmlFor="pitch">Pitch</label>
        <MDEditor
        value={pitch}
        onChange={(value) => setPitch(value as string)}
        id="pitch"
        height={300}
        preview="edit"
        style={{ borderRadius: 20, overflow: "hidden" }}
        textareaProps={{
          placeholder:
          "brief on pitch",
        }}
        previewOptions={{
          disallowedElements: ["style"],
        }}
        />
        {errors.pitch && <p>{errors.pitch}</p>}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "submittiong.." : "submit"}
        <Send />
      </Button>
    </form>
  );
}
