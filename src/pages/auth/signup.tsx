import { signUp } from "@/backend/auth/auth.service";
import * as React from "react";
import { useState } from "react";

export default function SignUp() {
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("password1")) {
      setIsValidPassword(false);
      console.log("error password");
      throw new Error("비밀번호 에러");
    }

    if (isValidPassword) {
      const newUser = {
        email: data.get("email") as string,
        password: data.get("password") as string,
      };
      await signUp(newUser.email, newUser.password);
    }
  };

  return <div>sign up</div>;
}
