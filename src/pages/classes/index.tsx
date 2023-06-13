import { getClasses } from "@/backend/classes/classes.service";
import { useState } from "react";

export default function Classes({ gymList }: any) {
  let classes = JSON.parse(gymList);
  const [gyms, setGyms] = useState(classes);

  return (
    <>
      {gyms.map((gym: any) => {
        return <div key={gym.id}>{gym.name}</div>;
      })}
    </>
  );
}

export async function getServerSideProps() {
  let gymList: any = await getClasses();
  gymList = JSON.stringify(gymList);

  return {
    props: { gymList },
  };
}
