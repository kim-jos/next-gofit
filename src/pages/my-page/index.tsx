import { useAuthContext } from "@/auth.context";

export default function MyPage() {
  const signInUser = useAuthContext();
  console.log("user:", signInUser);

  return <div>{signInUser?.user?.email}</div>;
}
