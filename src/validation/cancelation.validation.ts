// needs to be at least 24 hours before class start time

export async function canCancel(reservation: any) {
  const currDate = new Date(Date.now());

  //   const { data, error } = await supabaseClient
  //     .from(classAvailabilityTable)
  //     .select("time, id")
  //     .eq("id", reservation.class_time);

  //   const { time } = data[0];
  //   const hours = time.toString().split(":");
  //   const date = new Date(reservation.reservation_date);

  //   date.setHours(Number(hours[0]), Number(hours[1]), Number(hours[2]));
  //   const validTime = differenceInMinutes(date, currDate) >= 60 * 24;

  //   if (validTime) return false; // it is a valid time;
  return true; // it is a invalid time
}
