import { getAuth } from "firebase/auth";
import {
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import { getUser } from "../auth/auth.service";
import { app } from "../config";
import ClassAvailableTimeSlots from "../time-slots/class-available-time-slots.model";
import Reservations from "./reservations.model";

const db = getFirestore(app);
const auth = getAuth(app);

// Function to check if the user has already signed up for a class
async function isUserSignedUp(
  user: DocumentReference,
  timeSlotRef: DocumentReference
) {
  const reservations = await getDocs(
    query(
      collection(db, "reservations"),
      where("user", "==", user),
      where("timeSlot", "==", timeSlotRef)
    )
  );
  return !reservations.empty;
}

async function hasReachedMaxCapacity(timeSlotRef: DocumentReference) {
  const allReservationsForTimeSlot = await getDocs(
    query(collection(db, "reservations"), where("timeSlot", "==", timeSlotRef))
  );

  const timeSlotQuery = await getDocs(
    query(
      collection(db, "classAvailableTimeSlots"),
      where("id", "==", timeSlotRef.id)
    )
  );
  const timeSlot = timeSlotQuery.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as unknown as ClassAvailableTimeSlots)
  );
  const maxLimit = timeSlot[0].maxLimit;

  const reservationsCount = allReservationsForTimeSlot.size;
  return reservationsCount >= maxLimit; // Assuming maxLimit is a variable accessible in the current scope
}

async function hasEnoughCredits(userRef: DocumentReference) {
  // check user type
  const user = getUser(userRef.id);

  // check if companyHasEnough credits (선구매)

  // check if hasEnough credits (임지권 별 구매)
  // check if hasEnough credits (개인 구매)
  return true;
}

export async function getUserReservations(userRef: DocumentReference) {
  try {
    const reservations = await getDocs(
      query(
        collection(db, "reservations"),
        where("user", "==", userRef),
        where("isFinal", "==", true),
        orderBy("startTime")
      )
    );
    return reservations.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as unknown as Reservations)
    );
  } catch (err) {
    console.error("Error retrieving classes:", err);
  }
}

export async function makeReservation(
  reservation: Reservations,
  userRef: DocumentReference,
  timeSlotsRef: DocumentReference
) {
  const enoughCredits = await hasEnoughCredits(userRef);
  if (!enoughCredits) throw new Error("포인트 충천 후 사용해주세요");

  if (await hasReachedMaxCapacity(timeSlotsRef))
    throw new Error("수업 마감되었습니다");

  if (await isUserSignedUp(userRef, timeSlotsRef))
    throw new Error("이미 예약한 수업입니다!");

  // Add the reservation document to the "reservations" collection
  try {
    const docRef = await addDoc(collection(db, "reservations"), reservation);
    return docRef.id;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw new Error("Failed to create reservation.");
  }

  // decrease credits
  // 알림톡
  // firebase analytics
}

export async function cancelReservation(id: string) {
  // check if time is valid
  // confirm using modal

  // cancel reservation document
  try {
    const reservationRef = doc(db, "reservations", id);
    await deleteDoc(reservationRef);
  } catch (error) {
    throw new Error("Failed to delete reservation.");
  }

  // increment credits
  // 알림톡
  // firebase analytics
}
