import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Container from "@/components/ui/container";
import { useMutation, useQuery } from "@tanstack/react-query";

// import { Link, useNavigate } from "react-router-dom";
import { loginSFormSchema } from "./schema";

import { fillProfileInfo, getProfileInfo } from "@/supabase/account";

import { userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";

type ProfileTypes = {
  id?: string;
  website?: string;
  updated_at?: string;
  username: string;
  avatar_url: string;
  full_name: string;
};

export function ProfileForm() {
  //   const navigate = useNavigate();
  const user = useAtomValue(userAtom);

  console.log(user);

  const form = useForm<ProfileTypes>({
    resolver: zodResolver(loginSFormSchema),
    defaultValues: { username: "", full_name: "", avatar_url: "" },
  });

  const {
    data: profileData,
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["profileData"],
    queryFn: () => getProfileInfo(user?.user.id),
    // onSuccess: (data) => reset(data),
  });

  const { mutate: handleFillProfile } = useMutation({
    mutationKey: ["fill_profile"],

    mutationFn: (payload: ProfileTypes) =>
      fillProfileInfo(payload as ProfileTypes),
    /*   onSuccess: () => {
      navigate("/");
    }, */
  });

  const onSubmit = (value: ProfileTypes) => {
    handleFillProfile({
      ...value,

      id: user?.user?.id,
    });
    console.log(value);
  };

  return (
    <Container>
      <div>{profileData && <div>{profileData.username} </div>}</div>

      <div className="w-full h-full flex items-center justify-center ">
        <div className="w-[600px] p-12 bg-white rounded-3xl">
          <div className="text-2xl font-semibold text-center mb-8">
            Fill your profile info
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>avarat</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
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
      </div>
    </Container>
  );
}

export default ProfileForm;
