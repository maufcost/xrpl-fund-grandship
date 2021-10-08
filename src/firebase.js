import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    arrayUnion,
    arrayRemove,
    collection,
    query,
    where
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.key,
  authDomain: process.env.domain,
  projectId: process.env.pid,
  storageBucket: process.env.bucket,
  messagingSenderId: "696235957039",
  appId: "1:696235957039:web:fe6eef42b5003b757a5fda",
  measurementId: "G-Q59LQZ3BZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage();

// After an NFT is bought, we will remove it from our db forever.
export const addNFTToDB = async (id, name, desc, file) => {

}

// This nft has been bought
export const removeNFTToDB = async (id) => {

}
