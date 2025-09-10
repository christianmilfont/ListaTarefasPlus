// tasks.ts
import { db } from './firebaseConfig';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

export const addTask = async (userId: string, task: string) => {
  await addDoc(collection(db, 'tasks'), {
    userId,
    task,
    createdAt: new Date()
  });
};

export const subscribeTasks = (userId: string, callback: (tasks: any[]) => void) => {
  const q = query(collection(db, 'tasks'), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};
