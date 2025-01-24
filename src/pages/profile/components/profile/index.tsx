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
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";

// import { Link, useNavigate } from "react-router-dom";
import { loginSFormSchema } from "./schema";

import { fillProfileInfo, getProfileInfo } from "@/supabase/account";

import { userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";
import { useState } from "react";

type ProfileTypes = {
  id?: string;
  website?: string;
  updated_at?: string;
  username: string;
  avatar_url?: string;
  full_name: string;
};

const ProfileForm: React.FC = () => {
  //   const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);

  const user = useAtomValue(userAtom);
  const queryClient = new QueryClient();

  console.log(user);

  const form = useForm<ProfileTypes>({
    resolver: zodResolver(loginSFormSchema),
    defaultValues: { username: "", full_name: "" },
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
  });

  const handleOpenForm = () => {
    setOpenForm((prev) => !prev);
  };

  const onSubmit = (value: ProfileTypes) => {
    handleFillProfile({
      ...value,

      id: user?.user?.id,
    });
    setOpenForm(false);

    // console.log(value);
  };

  return (
    <Container>
      <div className="w-full bg-customBage p-6 rounded-3xl dark:bg-opacity-20 flex items-center justify-between">
        {profileData && (
          <div className="flex items-center gap-5">
            <div className="text-4xl w-20 h-20 bg-customGray rounded-full flex items-center justify-center text-white font-semibold dark:bg-customBage dark:text-customGray">
              {profileData.username?.[0].toUpperCase()}
            </div>
            <div className="text-xl">{profileData.username} </div>
          </div>
        )}
        <div className="flex flex-col xl:flex-row gap-6">
          <Link to="/create-storie">
            <Button>Create Storie</Button>
          </Link>
          <Button
            className="text-white"
            variant="outline"
            onClick={handleOpenForm}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {openForm && (
        <div className="w-full h-full flex items-center justify-center mt-12">
          <div className="w-[600px] p-12 bg-white rounded-3xl bg-opacity-20">
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

                <Button className="w-full mt-4" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProfileForm;
