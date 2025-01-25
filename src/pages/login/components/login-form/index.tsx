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
import { useMutation } from "@tanstack/react-query";
import { login } from "@/supabase/auth";
import { loginSFormSchema } from "./schema";
import { Link, useNavigate } from "react-router-dom";
import { APP_PATHS } from "@/routes/default/index.enum";

type LoginTypes = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<LoginTypes>({
    resolver: zodResolver(loginSFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate: loginMutation } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
  });

  const onSubmit = (value: LoginTypes) => {
    loginMutation(value);
  };
  // console.log('hello from login form')
  return (
    <Container>
      <div className="w-full h-full flex items-center justify-center ">
        <div className="w-[600px] p-12 bg-customBage dark:bg-opacity-20 rounded-3xl">
          <div className="text-2xl font-semibold text-center mb-8">
            Login on SelfKana
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
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
          <div className="flex  mt-6 justify-center gap-4 items-center">
            <div>Are not you registered yet?</div>
            <div className="text-xl font-semibold">
              <Link to={"/" + APP_PATHS.SIGNUP}>Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
