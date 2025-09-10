import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmy5AwYvWgAsAjM1VU0X-qbIzVihoga0c",
  authDomain: "listatarefasplus.firebaseapp.com",
  projectId: "listatarefasplus",
  storageBucket: "listatarefasplus.firebasestorage.app",
  messagingSenderId: "945987903776",
  appId: "1:945987903776:web:9b818da49346d9e65df745",
  measurementId: "G-ZDS8Q1975Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
