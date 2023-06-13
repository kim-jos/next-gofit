export default class Reservations {
  timeSlot: string;
  user: string;
  classRequiredCredits: number;
  className: string;
  createdAt: Date;
  isFinal: boolean;
  startTime: Date;
  // date: string;
  // time: string;

  constructor(
    timeSlot: string,
    user: string,
    classRequiredCredits: number,
    className: string,
    createdAt: Date,
    isFinal: boolean,
    startTime: Date
    // date: string,
    // time: string,
  ) {
    this.timeSlot = timeSlot;
    this.user = user;
    this.classRequiredCredits = classRequiredCredits;
    this.className = className;
    this.createdAt = createdAt;
    this.isFinal = isFinal;
    this.startTime = startTime;
    // this.date = date;
    // this.time = time;
  }
}
