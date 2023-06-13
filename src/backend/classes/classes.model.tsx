import { DocumentReference, GeoPoint } from "firebase/firestore/lite";

export default class Classes {
  id: string;
  refPath: string;
  name: string;
  image: string;
  exerciseType: string;
  priority: number;
  distance: number;
  hideClass: boolean;
  ratings: number;
  coords: GeoPoint | string;
  isPopular: boolean;
  creditsRequired: number;
  paymentUrl: string;
  locationFilter: string;
  originalPrice: number;
  monthlyLimit: number;
  duration: string;
  misc: string;
  address: string;
  website: string;
  description: string;
  requirements: string;
  latitude: number;
  instagram: string;
  price: number;
  hasShower: boolean;
  classAvailableTimeSlotsRefs: DocumentReference[];

  constructor(
    id: string,
    refPath: string,
    name: string,
    image: string,
    exerciseType: string,
    priority: number,
    distance: number,
    hideClass: boolean,
    ratings: number,
    coords: string,
    isPopular: boolean,
    creditsRequired: number,
    paymentUrl: string,
    locationFilter: string,
    originalPrice: number,
    monthlyLimit: number,
    duration: string,
    misc: string,
    address: string,
    website: string,
    description: string,
    requirements: string,
    latitude: number,
    instagram: string,
    price: number,
    hasShower: boolean,
    classAvailableTimeSlotsRefs: string[]
  ) {
    this.id = id;
    this.refPath = refPath;
    this.name = name;
    this.image = image;
    this.exerciseType = exerciseType;
    this.priority = priority;
    this.distance = distance;
    this.hideClass = hideClass;
    this.ratings = ratings;
    this.coords = coords;
    this.isPopular = isPopular;
    this.creditsRequired = creditsRequired;
    this.paymentUrl = paymentUrl;
    this.locationFilter = locationFilter;
    this.originalPrice = originalPrice;
    this.monthlyLimit = monthlyLimit;
    this.duration = duration;
    this.misc = misc;
    this.address = address;
    this.website = website;
    this.description = description;
    this.requirements = requirements;
    this.latitude = latitude;
    this.instagram = instagram;
    this.price = price;
    this.hasShower = hasShower;
    this.classAvailableTimeSlotsRefs = classAvailableTimeSlotsRefs;
  }
}
