import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Container from "@/components/ui/container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { storieFormSchema } from "./schema";
import { supabase } from "@/supabase";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";

type StorieTypes = {
  title: string;
  description: string;
  audio_url?: File;
};

const CreateStorie = () => {
  const [user] = useAtom(userAtom);

  const form = useForm<StorieTypes>({
    resolver: zodResolver(storieFormSchema),
    defaultValues: { title: "", description: "", audio_url: undefined },
  });

  const onSubmit = (values: StorieTypes) => {
    if (values.audio_url) {
      supabase.storage
        .from("books_url")
        .upload(values?.audio_url?.name, values.audio_url)
        .then((res) => {
          return supabase.from("books").insert({
            title: values.title,
            description: values.description,
            audio_url: res.data?.fullPath,
            user_id: user?.user?.id,
          });
        })
        .then((res) => {
          console.log("succsessfully created storie", res);
        });
    }

    console.log("storie form values", values);
  };

  return (
    <Container>
      <div
        className=" border-[12px] p-6 lg:p-12 border-white w-full
       rounded-3xl bg-customGray bg-math-grid bg-60px 
        text-white  mb-20 "
      >
        <div className="text-2xl md:text-4xl">
          გაქვს საინტერესო ისტორია, ან ნაწარმოები იაპონურ ენაზე?
        </div>
        <div className="text-4xl md:text-6xl mt-7 inline-block bg-customRed font-semibold">
          გაგვიზიარე ის!
        </div>
      </div>

      <div className="lg:px-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-48" placeholder="Description" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="audio_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audio</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full mt-4" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default CreateStorie;
