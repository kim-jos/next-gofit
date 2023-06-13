import { signIn } from "@/backend/auth/auth.service";
import * as React from "react";

export default function SignIn() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    await signIn(email, password);
  };

  return <div>sign in</div>;
}
