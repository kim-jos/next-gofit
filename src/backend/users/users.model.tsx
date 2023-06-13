export default class Users {
  email: string;
  display_name: string;
  photo_url: string;
  uid: string;
  created_time: Date;
  phone_number: string;
  currCredits: number;
  admin: boolean;
  expirationDate: Date;
  referralCount: number;
  referralCode: string;
  referralBy: string;

  constructor(
    email: string,
    display_name: string,
    photo_url: string,
    uid: string,
    created_time: Date,
    phone_number: string,
    currCredits: number,
    admin: boolean,
    expirationDate: Date,
    referralCount: number,
    referralCode: string,
    referralBy: string
  ) {
    this.email = email;
    this.display_name = display_name;
    this.photo_url = photo_url;
    this.uid = uid;
    this.created_time = created_time;
    this.phone_number = phone_number;
    this.currCredits = currCredits;
    this.admin = admin;
    this.expirationDate = expirationDate;
    this.referralCount = referralCount;
    this.referralCode = referralCode;
    this.referralBy = referralBy;
  }
}
