import { GymTypes } from "@/utils/gofitEnums";
import Image from "next/image";
import { FaceSmileIcon } from "@heroicons/react/24/solid";

export default function GymTypeCarousel() {
  return (
    <div className={"px-4 my-4"}>
      <div className={"flex flex-row gap-2 overflow-x-scroll"}>
        {Object.values(GymTypes).map((el) => {
          return (
            <div
              key={el.en}
              className={
                "text-center w-24 bg-white rounded-lg shadow-md border-gray-400 border-[1px] px-2"
              }
            >
              <FaceSmileIcon width={52} height={40} />
              <div className={"text-xs font-normal"}>{el.ko}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
