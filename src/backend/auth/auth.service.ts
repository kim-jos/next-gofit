import { createUserWithEmailAndPassword } from "@firebase/auth";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import {
  DocumentReference,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore/lite";
import { app, auth } from "../config";

const db = getFirestore(app);

export async function getUser(uid: string) {
  try {
    const users = await getDocs(
      query(collection(db, "users"), where("uid", "==", uid))
    );

    const final = users.docs.map((doc) => ({
      ...doc.data(),
      ref: doc.ref,
      id: doc.id,
    }));
    return final[0];
  } catch (err) {
    console.error("Error retrieving classes:", err);
  }
}

export async function signUp(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

type UserCredentials = {
  credentials: UserCredential;
  ref: DocumentReference;
};

export async function signIn(email: string, password: string) {
  const userCreds = await signInWithEmailAndPassword(auth, email, password);
  const userRef = await getUser(userCreds.user.uid);
  const userCredentials: UserCredentials = {
    credentials: userCreds,
    ref: userRef!.ref,
  };
  return userCredentials;
}
