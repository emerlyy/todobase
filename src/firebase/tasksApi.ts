import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import type { Task } from "../types";
import { db } from "./firebase";

export const createTask = async (
  listId: string,
  task: { title: string; description: string }
): Promise<string> => {
  try {
    const tasksRef = collection(db, "lists", listId, "tasks");
    const docRef = await addDoc(tasksRef, {
      ...task,
      completed: false,
    });
    return docRef.id;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    throw error;
  }
};

export const getTasksForList = async (
  listId: string
): Promise<Task[] | null> => {
  try {
    const tasksRef = collection(db, "lists", listId, "tasks");
    const snapshot = await getDocs(tasksRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    throw error;
  }
};

export const updateTask = async (
  listId: string,
  taskId: string,
  updates: Partial<{ title: string; description: string; completed: boolean }>
): Promise<void> => {
  try {
    const taskRef = doc(db, "lists", listId, "tasks", taskId);
    await updateDoc(taskRef, updates);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    throw error;
  }
};

export const deleteTask = async (
  listId: string,
  taskId: string
): Promise<void> => {
  try {
    const taskRef = doc(db, "lists", listId, "tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    throw error;
  }
};
