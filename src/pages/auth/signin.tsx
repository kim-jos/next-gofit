import { signIn } from "@/backend/auth/auth.service";
import * as React from "react";

export default function SignIn() {
  const handleSubmit = async () => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const email = data.get("email") as string;
    // const password = data.get("password") as string;
    const user = await signIn("partnerships.gofit@gmail.com", "123456");
    console.log(user);
  };

  React.useEffect(() => {
    async function get() {
      await handleSubmit();
    }
    get();
  });

  return <div>sign in</div>;
}
