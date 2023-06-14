import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import Classes from './classes.model';
import { app } from "../config";


const db = getFirestore(app);

export async function getClasses() {
  try {
    const classesDocs = await getDocs(
      query(
        collection(db, "classes"),
        where("hideClass", "==", false),
        orderBy("priority", "asc")
      )
    );

    const classes = classesDocs.docs.map((doc) => {
      const data = doc.data();
      return new Classes(
        doc.id,
        data.referencePath,
        data.name,
        data.image,
        data.exerciseType,
        data.priority,
        data.distance,
        data.hideClass,
        data.ratings,
        data.coords,
        data.isPopular,
        data.creditsRequired,
        data.paymentUrl,
        data.locationFilter,
        data.originalPrice,
        data.monthlyLimit,
        data.duration,
        data.misc,
        data.address,
        data.website,
        data.description,
        data.requirements,
        data.latitude,
        data.instagram,
        data.price,
        data.hasShower,
        data.classAvailableTimeSlotsRefs
      );
    });
    return classes;
  } catch (error) {
    console.error("Error retrieving classes:", error);
    return [];
  }
}
