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

export async function getClasses() {
  try {
    const classesDocs = await getDocs(
      query(
        collection(db, "classes"),
        where("hideClass", "==", false),
        orderBy("priority", "asc")
      )
    );
    const classes = classesDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return classes;
  } catch (error) {
    console.error("Error retrieving classes:", error);
    return [];
  }
}
