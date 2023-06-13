import { ko } from "date-fns/locale";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function ClassDetails() {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

  const handleDayClick = (date) => {
    console.log("selected date: ", selectedDate);
    setSelectedDate(date);
  };

  const isDateSelectable = (date) => {
    const today = new Date();
    const nextWeek = new Date();
    today.setDate(today.getDate() - 1);
    nextWeek.setDate(today.getDate() + 8);

    return date >= today && date <= nextWeek;
  };

  const isDateDisabled = (date) => {
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
