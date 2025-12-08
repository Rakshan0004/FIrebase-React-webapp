

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyCcKVdcz2NHnabrwYSDI2BGGZvfkiCFMPo",
  authDomain: "firstprojectwithfb.firebaseapp.com",
  projectId: "firstprojectwithfb",
  storageBucket: "firstprojectwithfb.firebasestorage.app",
  messagingSenderId: "772551237076",
  appId: "1:772551237076:web:c5c575ed36b8b804de8a41",
  measurementId: "G-FNL1B2J1CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firestore = getFirestore(app);