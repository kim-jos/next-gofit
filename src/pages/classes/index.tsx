import Classes from "@/backend/classes/classes.model";
import { getClasses } from "@/backend/classes/classes.service";
import Link from "next/link";
import { useState } from "react";

export default function ClassesPage({ gymList }: { gymList: Classes[] }) {
  // let classes = JSON.parse(gymList);
  const [gyms, setGyms] = useState<Classes[]>(gymList);

  return (
    <>
      {gyms.map((gym) => {
        return (
          <>
            <Link
              href={{
                pathname: `/classes/${gym.refPath}`,
                query: { ref: gym.refPath },
              }}
              key={gym.id}
            >
              {gym.name}
            </Link>
          </>
        );
      })}
    </>
  );
}

export async function getServerSideProps() {
  const gyms = await getClasses();
  const gymList = JSON.stringify(gyms);
  return {
    props: { gymList },
  };
}
