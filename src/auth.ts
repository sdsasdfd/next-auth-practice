import NextAuth, { CredentialsSignin } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import User from "./models/userModel";
import { compare } from "bcryptjs";
import { connectToDB } from "./lib/utils";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password *****",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        console.log(email, password);
        if (!email || !password) {
          throw new CredentialsSignin({ cause: "provide credentials " });
        }
        await connectToDB();
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new CredentialsSignin({ cause: "Invalid email or password " });
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin({ cause: "Invalid email or password " });
        }

        return { name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
