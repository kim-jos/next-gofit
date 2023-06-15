import { useAuthContext } from "@/auth.context";
import Reservations from "@/backend/reservations/reservations.model";
import { getUserReservations } from "@/backend/reservations/reservations.service";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import CommonHeader from "@/components/molecules/CommonHeader";
import { signIn } from "@/backend/auth/auth.service";
import { getClasses } from "@/backend/classes/classes.service";
import dayjs from "dayjs";
import Image from "next/image";

export default function MyReservations() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  function tileContent({ date, view }) {
    if (
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return (
        <div
          style={{
            fontSize: "10px",
            fontWeight: 400,
            lineHeight: "12px",
            letterSpacing: "0em",
            textAlign: "left",
            color: "red",
          }}
        >
          오늘
        </div>
      );
    } else if (
      myReservations?.filter((el) => {
        //@ts-ignore
        const d = new Date(el?.date);
        return (
          d.getMonth() === date.getMonth() && d.getDate() === date.getDate()
        );
      })?.length > 0
    ) {
      return (
        <div className={"flex relative items-center justify-center w-full"}>
          <div className={"absolute rounded-full bg-[#00FF00] w-2 h-2 mt-4"} />
        </div>
      );
    }
  }
  function tileDisabled({ date, view }) {
    if (
      date >
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
    ) {
      return true;
    }
  }

  return (
    <div
      className={"bg-gray-100 min-h-screen flex-1 items-center justify-center"}
    >
      <CommonHeader title={"예약현황"} />
      <div
        className={"flex justify-center"}
        style={{ transform: "translate(1.4)" }}
      >
        <Calendar
          onChange={(e) => {
            //@ts-ignore
            console.log(new Date(e));
            //@ts-ignore
            setSelectedDate(new Date(e));
          }}
          value={selectedDate}
          tileDisabled={tileDisabled}
          calendarType={"US"}
          tileContent={tileContent}
          formatDay={(locale, date) => {
            return String(date.getDate());
          }}
        />
        {/*<DayPicker*/}
        {/*  mode="single"*/}
        {/*  selected={selectedDate}*/}
        {/*  onSelect={handleDayClick}*/}
        {/*  disabled={isDateDisabled}*/}
        {/*  locale={ko}*/}
        {/*  fromMonth={new Date(today.getFullYear(), today.getMonth() - 1)}*/}
        {/*  toMonth={new Date(today.getFullYear(), today.getMonth() + 1)}*/}
        {/*  // modifiersStyles={{ booked: modifiersStyles.booked }}*/}
        {/*  // modifiers={{ booked: [new Date(2023, 6, 8), new Date(2023, 6, 9)] }}*/}
        {/*  modifiers={{ booked: bookedDays }}*/}
        {/*  modifiersStyles={{ ...modifiersStyles }}*/}
        {/*  labels={{}}*/}
        {/*/>*/}
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
        .map((el, idx) => {
          const start = dayjs(Number(el.startTime) * 1000);
          return (
            <div className={"w-full bg-white"} key={idx}>
              <div className={"p-4 flex flex-row"}>
                <Image
                  src={
                    gymList?.find((e) => {
                      return e.name === el?.className;
                    })?.image
                  }
                  alt={"이미지"}
                  width={100}
                  height={75}
                  className={
                    "object-center object-cover rounded-md aspect-[4/3]"
                  }
                />
                <div className={"flex flex-col ml-2 pt-2"}>
                  <div className={"text-black font-medium text-xl"}>
                    {el.className}
                  </div>
                  <div className={"font-normal text-sm"}>
                    {start.format("M/DD HH:mm A")}
                  </div>
                  {/*<div*/}
                  {/*  className={*/}
                  {/*    "mt-2 text-sky-400 font-medium text-lg cursor-pointer"*/}
                  {/*  }*/}
                  {/*>*/}
                  {/*  리뷰 작성하기*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
