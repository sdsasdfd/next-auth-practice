import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "next-auth/react";

import Link from "next/link";

export default async function Home() {
  const session = await auth();
  console.log(session?.user);

  return (
    <div className="flex items-center justify-center h-dvh ">
      <Card>
        {session?.user ? (
          <CardHeader>
            <CardTitle>hello {session?.user?.name}</CardTitle>
            <CardContent>
              <Button onClick={signOut}>Logout</Button>
            </CardContent>
          </CardHeader>
        ) : (
          <Button>
            <Link href={"/login"}>Login</Link>
          </Button>
        )}
      </Card>
    </div>
  );
}
