import { useAuthContext } from "@/auth.context";
import Reservations from "@/backend/reservations/reservations.model";
import { getUserReservations } from "@/backend/reservations/reservations.service";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import CommonHeader from "@/components/molecules/CommonHeader";
import { signIn } from "@/backend/auth/auth.service";
import { getClasses } from "@/backend/classes/classes.service";
import dayjs from "dayjs";

export default function MyReservations() {
  const today = new Date(Date.now());
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [myReservations, setMyReservations] = useState<Reservations[]>();
  const signInUser = useAuthContext();
  const [gymList, setGymList] = useState(null);

  useEffect(() => {
    async function fetchUserReservations() {
      if (signInUser!.user) {
        const reservations = await getUserReservations(signInUser!.userRef);
        setMyReservations(reservations);
        console.log("my reservations: ", reservations);
      } else {
        const user = await signIn("partnerships.gofit@gmail.com", "123456");
        const reservations = await getUserReservations(user.ref);
        setMyReservations(reservations);
      }
      const gyms = await getClasses();
      setGymList(gyms);
    }
    fetchUserReservations();
  }, []);

  const handleDayClick = (date: any) => {
    setSelectedDate(date);
  };

  const isDateSelectable = (date: Date) => {
    const today = new Date();
    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const nextWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );

    return date >= prevMonth && date <= nextWeek;
  };

  const isDateDisabled = (date: Date) => {
    return !isDateSelectable(date);
  };

  const modifiersStyles = {
    booked: {
      border: "4px solid",
      borderColor: "#00FF00",
      paddingBottom: "0px",
    },
  };

  const bookedDays = myReservations?.map((el) => {
    //@ts-ignore
    return new Date(el?.date);
  });
  console.log(myReservations);
  console.log(
    gymList?.find((el) => {
      return el.name === "스타디온 삼성";
    })
  );
  console.log(gymList?.map((el) => el.name));
  return (
    <div
      className={"bg-gray-100 min-h-screen flex-1 items-center justify-center"}
    >
      <CommonHeader title={"예약현황"} />
      <div
        className={"flex justify-center"}
        style={{ transform: "translate(1.4)" }}
      >
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDayClick}
          disabled={isDateDisabled}
          locale={ko}
          fromMonth={new Date(today.getFullYear(), today.getMonth() - 1)}
          toMonth={new Date(today.getFullYear(), today.getMonth() + 1)}
          // modifiersStyles={{ booked: modifiersStyles.booked }}
          // modifiers={{ booked: [new Date(2023, 6, 8), new Date(2023, 6, 9)] }}
          modifiers={{ booked: bookedDays }}
          modifiersStyles={{ ...modifiersStyles }}
          labels={{}}
        />
      </div>
      {/*{myReservations !== undefined*/}
      {/*  ? myReservations.map((myReservation) => {*/}
      {/*      return (*/}
      {/*        <>*/}
      {/*          <div>수업명: {myReservation.className}</div>*/}

      {/*          <div>수업 시작 시간: {String(myReservation.startTime)}</div>*/}
      {/*          <div>*/}
      {/*            수업 시작 시간: {String(new Date(myReservation.startTime))}*/}
      {/*          </div>*/}
      {/*          <div>수업 예약한 시간: {String(myReservation.createdAt)}</div>*/}
      {/*        </>*/}
      {/*      );*/}
      {/*    })*/}
      {/*  : null}*/}
      {myReservations
        ?.filter((el) => {
          //@ts-ignore
          const d = new Date(el?.date);
          return (
            d.getMonth() === selectedDate.getMonth() &&
            d.getDate() === selectedDate.getDate()
          );
        })
        .map((el) => {
          const start = new dayjs(el.startTime * 1000);
          return (
            <div className={"w-full bg-white"}>
              <div className={"p-4 flex flex-row"}>
                <div
                  className={"bg-gray-400 rounded-md h-[80px] w-[80px]"}
                ></div>
                <div className={"flex flex-col ml-2"}>
                  <div className={"text-black font-medium text-xl"}>
                    {el.className}
                  </div>
                  <div className={"font-normal text-sm"}>
                    {start.format("M/DD HH:mm A")}
                  </div>
                  <div
                    className={
                      "mt-2 text-sky-400 font-medium text-lg cursor-pointer"
                    }
                  >
                    리뷰 작성하기
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
