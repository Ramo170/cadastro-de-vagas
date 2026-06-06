// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm45D1n1YXttfkamizHon-lNSzdzpb5Uc",
  authDomain: "cadastro-vagas-bb794.firebaseapp.com",
  projectId: "cadastro-vagas-bb794",
  storageBucket: "cadastro-vagas-bb794.firebasestorage.app",
  messagingSenderId: "13502824450",
  appId: "1:13502824450:web:aec4ba7273c8bc028ce71b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
