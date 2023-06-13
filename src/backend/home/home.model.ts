import { DocumentReference } from "firebase/firestore/lite";

export default class Home {
  id: string;
  title: string;
  classesRef: DocumentReference[];

  constructor(id: string, title: string, classesRef: DocumentReference[]) {
    this.id = id;
    this.title = title;
    this.classesRef = classesRef;
  }
}
