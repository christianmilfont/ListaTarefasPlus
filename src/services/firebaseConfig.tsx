import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmy5AwYvWgAsAjM1VU0X-qbIzVihoga0c",
  authDomain: "listatarefasplus.firebaseapp.com",
  projectId: "listatarefasplus",
  storageBucket: "listatarefasplus.firebasestorage.app",
  messagingSenderId: "945987903776",
  appId: "1:945987903776:web:9b818da49346d9e65df745",
  measurementId: "G-ZDS8Q1975Z",
};

// Se já existir app, reutiliza; senão cria
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ⚡ auth só pode ser inicializado uma vez
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app); // se já existe, apenas pega
}

const db = getFirestore(app);

export { app, auth, db };
