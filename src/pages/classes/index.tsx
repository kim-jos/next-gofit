import { getClasses } from "@/backend/classes/classes.service";
import { useEffect, useState } from "react";
import MainHeader from "@/components/molecules/MainHeader";
import GymTypeCarousel from "@/components/organisms/GymTypeCarousel";
import ClassHorizontalCarousel from "@/components/organisms/ClassHorizontalCarousel";
import { useViewport } from "react-viewport-hooks";

export default function Classes({ gymList }: any) {
  let classes = JSON.parse(gymList);
  const [gyms, setGyms] = useState(classes);

  return (
    <div>
      <div className={"bg-gray-100 min-h-screen flex-1 items-center"}>
        <MainHeader />
        <GymTypeCarousel />
        <ClassHorizontalCarousel
          title={"인기"}
          classes={gyms.filter((el: any) => el.isPopular)}
        />
        <ClassHorizontalCarousel
          title={"점심가능"}
          classes={gyms.filter((el: any) => !el.isPopular)}
        />
        <ClassHorizontalCarousel
          title={"땀빼기"}
          classes={gyms.filter((el: any) => !el.isPopular)}
        />
        <ClassHorizontalCarousel
          title={"요가"}
          classes={gyms
            .filter((el: any) => !el.isPopular)
            .filter((el: any) => el.exerciseType === "요가")}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const gyms = await getClasses();
  const gymList = JSON.stringify(gyms);
  return {
    props: { gymList },
  };
}
