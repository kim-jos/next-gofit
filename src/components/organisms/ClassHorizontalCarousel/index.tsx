import Image from "next/image";
import Link from "next/link";

export default function ClassHorizontalCarousel({
  title,
  classes,
}: {
  title: string;
  classes: any;
}) {
  console.log(classes);
  return (
    <section className={"bg-gray-100 py-2 px-4 flex-1 h-full overflow-y-auto"}>
      <p className={"text-xl font-semibold"}>{title}</p>
      <div
        className={"flex overflow-x-scroll gap-x-4 py-2 min-h-fit max-h-fit"}
      >
        {classes.map((el, idx) => {
          return (
            <Link
              href={{
                pathname: `/classes/${el.refPath}`,
                query: { ref: el.refPath },
              }}
              key={el.id}
            >
              <div
                className={
                  "w-[200px] min-w-fit relative h-[150px] min-h-[150px] max-h-[150px]"
                }
              >
                <Image
                  src={el.image}
                  alt={"gym 이미지"}
                  width={200}
                  height={150}
                  className={
                    "object-cover max-h-[150px] max-w-[200px] min-h-[150px] rounded-lg"
                  }
                />
                <div
                  className={
                    "absolute left-0 bg-black top-0 bg-opacity-40 max-w-[200px] w-full h-full text-center rounded-lg text-white items-end pt-16"
                  }
                >
                  <div className={"text-lg font-semibold"}>{el.name}</div>
                  <div>{el.exerciseType}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
