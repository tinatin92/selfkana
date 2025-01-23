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
import { supabase } from "@/supabase";
import { storieFormSchema } from "./schema";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStoryById, updateStorie } from "@/supabase/stories";
import { useEffect } from "react";

type StorieTypes = {
  audio_url?: File | string | null;
  created_at?: string;
  description?: string | null;
  id?: number;
  title_en?: string | null;
  title_ja?: string | null;
  user_id?: string | null;
};

const UpdateStorie = () => {
  const { id } = useParams<{ id: string }>();
  const storyId = id ? parseInt(id, 10) : undefined;

  const { data: storieDetail, isLoading } = useQuery({
    queryKey: ["storie-detail", storyId],
    queryFn: () => getStoryById(storyId!),
    enabled: !!id,
  });

  const form = useForm<StorieTypes>({
    resolver: zodResolver(storieFormSchema),
    values: storieDetail || {},
    defaultValues: {
      title_ja: storieDetail?.title_ja ?? "",
      title_en: storieDetail?.title_en ?? "",
      description: storieDetail?.description ?? "",
      audio_url: null,
    },
  });
  useEffect(() => {
    if (storieDetail) {
      form.reset(storieDetail);
    }
  }, [storieDetail, form]);

  const onSubmit = async (values: StorieTypes) => {
    if (!storyId) return;
    try {
      let audioUrl = storieDetail?.audio_url;

      if (values.audio_url instanceof File) {
        if (storieDetail?.audio_url) {
          await supabase.storage
            .from("books_url")
            .remove([storieDetail.audio_url]);
        }

        const fileName = `${Date.now()}-${values.audio_url.name}`;

        const { data, error: uploadError } = await supabase.storage
          .from("books_url")
          .upload(fileName, values.audio_url);

        if (uploadError) throw uploadError;

        audioUrl = data?.path || null;
      }

      const payload = {
        title_ja: values.title_ja || null,
        title_en: values.title_en || null,
        description: values.description || null,
        audio_url: audioUrl,
      };

      await updateStorie(storyId, payload);
    } catch (error) {
      console.error("Error updating story:", error);
    }
  };

  if (isLoading) return <p>Loading story details...</p>;

  return (
    <Container>
      <div className="border-[12px] p-6 lg:p-12 border-white w-full rounded-3xl bg-customGray bg-math-grid bg-60px text-white mb-20">
        <div className="text-2xl md:text-4xl">Update Story</div>
        <div className="text-4xl md:text-6xl mt-7 inline-block bg-customRed font-semibold">
          Share with us!
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
              name="title_ja"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Japanese Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Japanese title"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>English Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Englis title"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
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
                    <Textarea
                      className="min-h-48"
                      placeholder="Enter description"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
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
                  <FormLabel>Audio File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-4" type="submit">
              Update Story
            </Button>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateStorie;
