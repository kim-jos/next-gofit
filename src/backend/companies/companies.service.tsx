import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import { app } from "../config";

const db = getFirestore(app);

export async function getCompanies(userRef: any) {
  try {
    const reservations = await getDocs(
      query(
        collection(db, "companies"),
        where("user ", "==", userRef),
        where("isFinal", "==", true),
        orderBy("startTime")
      )
    );
    return reservations.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (err) {
    console.error("Error retrieving classes:", err);
  }
}
