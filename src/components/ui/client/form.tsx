"use client";

import { toast } from "sonner";
import { Button } from "../button";
import { Input } from "../input";
import { credentialsLogin } from "@/actions/login";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password)
          return toast.error("Please provide all fields");
        const toastId = toast.loading("Logging in");
        const error = await credentialsLogin(email, password);

        if (!error) {
          toast.success("login successfull", {
            id: toastId,
          });
          router.refresh();
        } else {
          toast.error(String(error), { id: toastId });
        }
      }}
      className=" flex flex-col gap-4"
    >
      <Input type="email" placeholder="email" name="email" />
      <Input type="password" placeholder="password" name="password" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
