import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
  doc,
  getDoc
} from "firebase/firestore/lite";
import Classes from './classes.model';
import { app } from "../config";


const db = getFirestore(app);

export async function getClassDetails(classRef: string) {
  try {
    const classDoc = await getDoc(doc(db, "classes", classRef));
    if (classDoc.exists()) {
      const classData = classDoc.data();
      // Create a new instance of the Classes class with the class data
      const classDetails = new Classes(
        classDoc.id,
        classData.refPath,
        classData.name,
        classData.image,
        classData.exerciseType,
        classData.priority,
        classData.distance,
        classData.hideClass,
        classData.ratings,
        classData.coords,
        classData.isPopular,
        classData.creditsRequired,
        classData.paymentUrl,
        classData.locationFilter,
        classData.originalPrice,
        classData.monthlyLimit,
        classData.duration,
        classData.misc,
        classData.address,
        classData.website,
        classData.description,
        classData.requirements,
        classData.latitude,
        classData.instagram,
        classData.price,
        classData.hasShower,
        classData.classAvailableTimeSlotsRefs,
        classData.info,
        classData.businessHours,
      );
      return classDetails;
    } else {
      console.error("Class document not found");
      return [];
    }
  } catch (err) {
    console.error("Error retrieving class details:", err);
    return [];
  }
}


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
        data.classAvailableTimeSlotsRefs,
        data.info,
        data.businessHours,
      );
    });
    return classes;
  } catch (error) {
    console.error("Error retrieving classes:", error);
    return [];
  }
}
