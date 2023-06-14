import ClassAvailableTimeSlots from "@/backend/time-slots/class-available-time-slots.model";
import { getTimeSlots } from "@/backend/time-slots/class-available-time-slots.service";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface TimeSlots {
  slots: ClassAvailableTimeSlots;
}

export default function ClassDetails({ slots }: TimeSlots) {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [timeSlots, setTimeSlots] = useState(slots);

  const handleDayClick = (date: any) => {
    console.log("selected date: ", selectedDate);
    setSelectedDate(date);
  };

  const isDateSelectable = (date: Date) => {
    const today = new Date();
    const nextWeek = new Date();
    today.setDate(today.getDate() - 1);
    nextWeek.setDate(today.getDate() + 8);

    return date >= today && date <= nextWeek;
  };

  const isDateDisabled = (date: Date) => {
    return !isDateSelectable(date);
  };

  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={handleDayClick}
      disabled={isDateDisabled}
      locale={ko}
    />
  );
}

export async function getServerSideProps({ query }: any) {
  console.log("query: ", query);
  let slots = await getTimeSlots(query.ref);
  return {
    props: { slots },
  };
}
