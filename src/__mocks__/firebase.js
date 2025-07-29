import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

if (process.env.NODE_ENV !== 'production') {
  const ports = {
    firestore: 18083,
    auth: 19099,
    ui: 14003
  };

  connectFirestoreEmulator(db, 'localhost', ports.firestore);
  connectAuthEmulator(auth, `http://localhost:${ports.auth}`, { disableWarnings: true });

  console.log(`🔥 Emulators connected: Firestore(${ports.firestore}), Auth(${ports.auth})`);
}

export { db, auth, app };

