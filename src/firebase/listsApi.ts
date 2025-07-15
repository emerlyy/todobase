import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import type { List } from "../types";
import { db } from "./firebase";

export const createList = async ({
  title,
  ownerId,
}: Pick<List, "title" | "ownerId">): Promise<string> => {
  try {
    const ref = collection(db, "lists");
    const docRef = await addDoc(ref, { title, ownerId, tasks: [] });
    return docRef.id;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    throw error;
  }
};

export const getUserLists = async (userId: string): Promise<List[] | null> => {
  try {
    const q = query(collection(db, "lists"), where("ownerId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as List[];
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    throw error;
  }
};

export const updateList = async (
  listId: string,
  updates: Partial<List>
): Promise<void> => {
  try {
    const ref = doc(db, "lists", listId);
    await updateDoc(ref, updates);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    throw error;
  }
};

export const deleteList = async (listId: string): Promise<void> => {
  try {
    const ref = doc(db, "lists", listId);
    await deleteDoc(ref);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    throw error;
  }
};
