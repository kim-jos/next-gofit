import { getClasses } from "@/backend/classes/classes.service";
import { useEffect, useState } from "react";
import MainHeader from "@/components/molecules/MainHeader";
import GymTypeCarousel from "@/components/organisms/GymTypeCarousel";
import ClassHorizontalCarousel from "@/components/organisms/ClassHorizontalCarousel";
import { useViewport } from "react-viewport-hooks";

export default function Classes({ gymList }: any) {
  let classes = JSON.parse(gymList);
  const [gyms, setGyms] = useState(classes);
  const { vw } = useViewport();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (vw) {
      if (vw > 900) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    }
  }, [vw]);
  console.log(gyms);
  console.log(gyms.filter((el) => el.isPopular));

  return (
    <div className={isDesktop ? "items-center flex justify-center" : ""}>
      <div className={"bg-gray-100 min-h-screen max-w-3xl flex-1 items-center"}>
        <MainHeader />
        <GymTypeCarousel />
        <ClassHorizontalCarousel
          title={"인기"}
          classes={gyms.filter((el) => el.isPopular)}
        />
        <ClassHorizontalCarousel
          title={"점심가능"}
          classes={gyms.filter((el) => !el.isPopular)}
        />
        <ClassHorizontalCarousel
          title={"땀빼기"}
          classes={gyms.filter((el) => !el.isPopular)}
        />
        <ClassHorizontalCarousel
          title={"요가"}
          classes={gyms
            .filter((el) => !el.isPopular)
            .filter((el) => el.exerciseType === "요가")}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let gymList: any = await getClasses();
  gymList = JSON.stringify(gymList);

  return {
    props: { gymList },
  };
}
