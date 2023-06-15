import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import { app } from "../config";

const db = getFirestore(app);

export async function getTimeSlots(classId: string) {
  try {
    const classRef = doc(db, "classes", classId);
    const timeSlots = await getDocs(
      query(
        collection(db, "classAvailableTimeSlots"),
        where("classRef", "==", classRef),
        orderBy("startTime")
      )
    );
    return timeSlots.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (err) {
    console.error("Error retrieving time slots:", err);
  }
}
