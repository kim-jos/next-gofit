import { useAuthContext } from "@/auth.context";
import Reservations from "@/backend/reservations/reservations.model";
import { getUserReservations } from "@/backend/reservations/reservations.service";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function MyReservations() {
  const today = new Date(Date.now());
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [myReservations, setMyReservations] = useState<Reservations[] | null>();
  const signInUser = useAuthContext();

  useEffect(() => {
    async function fetchUserReservations() {
      if (signInUser!.user) {
        const reservations = await getUserReservations(signInUser!.userRef);
        setMyReservations(reservations);
        console.log("my reservations: ", reservations);
      }
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
    greenDot: {
      backgroundColor: "green",
      borderRadius: "50%",
    },
  };

  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={handleDayClick}
      disabled={isDateDisabled}
      locale={ko}
      fromMonth={new Date(today.getFullYear(), today.getMonth() - 1)}
      toMonth={new Date(today.getFullYear(), today.getMonth() + 1)}
      modifiersStyles={modifiersStyles}
    />
  );
}
