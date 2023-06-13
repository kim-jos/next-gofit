import Classes from "@/backend/classes/classes.model";
import { getClassesForHome } from "@/backend/home/home.service";

export default function Home({ classes }: { classes: Classes }) {
  return (
    <>
      <div>home</div>
    </>
  );
}

export async function getServerSideProps({ query }: any) {
  let classes = await getClassesForHome();
  let string = JSON.stringify(classes);
  console.log("string: ", string);
  return {
    props: { string },
  };
}
