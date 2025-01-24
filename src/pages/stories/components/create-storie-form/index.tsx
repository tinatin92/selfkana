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
import Banner from "@/components/ui/banner";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "@/routes/default/index.enum";

type StorieTypes = {
  title_ja: string;
  title_en: string;
  description: string;
  audio_url?: File;
};

const CreateStorie: React.FC = () => {
  const [user] = useAtom(userAtom);

  const { t } = useTranslation();

  const navigate = useNavigate()

  const form = useForm<StorieTypes>({
    resolver: zodResolver(storieFormSchema),
    defaultValues: {
      title_ja: "",
      title_en: "",
      description: "",
      audio_url: undefined,
    },
  });

  const onSubmit = (values: StorieTypes) => {
    if (values.audio_url) {
      supabase.storage
        .from("books_url")
        .upload(values?.audio_url?.name, values.audio_url)
        .then((res) => {
          return supabase.from("books").insert({
            title_ja: values.title_ja,
            title_en: values.title_en,
            description: values.description,
            audio_url: res.data?.fullPath,
            user_id: user?.user?.id,
          });
        })
        .then(() => {
          navigate("/"+ APP_PATHS.PROFILE ); 
        });
    }

     
  };

  return (
    <Container>
      <Banner>
        <div className="text-2xl md:text-4xl">
          {t("create-storie.bannerText1")}
        </div>
        <div className="text-4xl md:text-6xl mt-7 inline-block bg-customRed font-semibold">
          {t("create-storie.bannerText2")}
        </div>
      </Banner>

      <div className=" p-6 lg:p-12 bg-customBage rounded-3xl dark:bg-opacity-20">
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
                    <Input placeholder="Title" {...field} />
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
                    <Textarea
                      className="min-h-48"
                      placeholder="Description"
                      {...field}
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
