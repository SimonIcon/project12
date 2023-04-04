import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAuPxIPweDSYXT-g4CInK_2_C7g4ZdP-IE",
  authDomain: "project-e5e5d.firebaseapp.com",
  projectId: "project-e5e5d",
  storageBucket: "project-e5e5d.appspot.com",
  messagingSenderId: "643438987097",
  appId: "1:643438987097:web:98c4e6288ec0c33de06e48",
  measurementId: "G-6VS2R4K62M"

};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app)

