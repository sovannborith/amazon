import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQkHmIedYBQNW61XW3LkTOAlXvRFk7WTY",
  authDomain: "fir-7bc02.firebaseapp.com",
  projectId: "fir-7bc02",
  storageBucket: "fir-7bc02.appspot.com",
  messagingSenderId: "581568773890",
  appId: "1:581568773890:web:fe767ff058c9c82cdd4c1b",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
