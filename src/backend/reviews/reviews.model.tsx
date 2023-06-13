export default class Reviews {
  userRef: string;
  classRef: string;
  createdAt: string;
  review: string;
  rating: number;
  reservationRef: string;

  constructor(
    userRef: string,
    classRef: string,
    createdAt: string,
    review: string,
    rating: number,
    reservationRef: string
  ) {
    this.userRef = userRef;
    this.classRef = classRef;
    this.createdAt = createdAt;
    this.review = review;
    this.rating = rating;
    this.reservationRef = reservationRef;
  }
}
