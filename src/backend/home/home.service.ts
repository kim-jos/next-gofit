import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { app } from "../config";
import Home from "./home.model";

const db = getFirestore(app);

export async function getClassesForHome() {
  try {
    const homeCollection = collection(db, "home");
    const homeDocs = await getDocs(homeCollection);
    const home = homeDocs.docs.map(
      (home) =>
        ({
          ...home.data(),
          id: home.id,
        } as Home)
    );

    return home;
  } catch (error) {
    console.error("Error retrieving classes:", error);
    return [];
  }
}

// const getClassesWithReferences  = (classesRef: DocumentReference[]) => {
//   const classesSnapshot: DocumentSnapshot[] = await getDocs(query(
//         collection(db, "classes"),
//         where("hideClass", "==", false),
//         orderBy("priority", "asc")
//       ));

// }
