import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getFirestore,
  connectFirestoreEmulator,
  enableIndexedDbPersistence
} from "firebase/firestore";
import {
  getAuth,
  connectAuthEmulator
} from "firebase/auth";
import {
  getStorage,
  connectStorageEmulator
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Emülatör bağlantıları (development ortamında)
if (process.env.NODE_ENV === 'development') {
  try {
    // Terminalde gösterilen port numaralarını kullanın
    // (firebase emulators:start çıktısına göre)
    connectFirestoreEmulator(db, '127.0.0.1', 8082); // 8080 → 8082
    connectAuthEmulator(auth, 'http://127.0.0.1:9097'); // 9099 → 9097
    connectStorageEmulator(storage, '127.0.0.1', 9197); // 9199 → 9197

    console.log('✅ Firebase emülatörlerine bağlanıldı:');
    console.log(`- Firestore: 127.0.0.1:8082`);
    console.log(`- Auth: http://127.0.0.1:9097`);
    console.log(`- Storage: 127.0.0.1:9197`);
  } catch (error) {
    console.error('❌ Emülatör bağlantı hatası:', error);
  }

  // Firestore offline desteği (sadece istemciler için)
  if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(db)
      .then(() => console.log('📚 Offline persistence aktif'))
      .catch(err => {
        if (err.code === 'failed-precondition') {
          console.warn('⚠️ Offline persistence sadece bir sekmede aktif olabilir');
        } else if (err.code === 'unimplemented') {
          console.warn('⚠️ Bu tarayıcı offline persistence desteklemiyor');
        } else {
          console.error('❌ Offline persistence hatası:', err);
        }
      });
  }
}

// Analytics initialization (sadece production'da)
let analytics;
if (process.env.NODE_ENV === 'production') {
  isSupported()
    .then(supported => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log('📊 Analytics başlatıldı');
      } else {
        console.log('🚫 Analytics desteklenmiyor');
      }
    })
    .catch(error => {
      console.error("❌ Analytics başlatma hatası:", error);
    });
}

export { db, auth, storage, analytics };