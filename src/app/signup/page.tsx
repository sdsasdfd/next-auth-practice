import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import User from "@/models/userModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { connectToDB } from "@/lib/utils";

const Page = () => {
  const signUpHandle = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!email || !password || !name) {
      throw new Error("Please provide all fields");
    }
    await connectToDB();

    const hashedPassword = await hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    redirect("/login");
  };
  return (
    <div className=" flex justify-center items-center h-dvh">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signUpHandle} className=" flex flex-col gap-4">
            <Input name="name" type="text" placeholder="name" />
            <Input name="email" type="email" placeholder="email" />
            <Input name="password" type="password" placeholder="password" />
            <Button type="submit">Sign up</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>Or</span>
          <form action="">
            <Button type="submit" variant={"outline"}>
              Sign up with Google
            </Button>
          </form>
          <Link href={"/login"}>have an account? Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
