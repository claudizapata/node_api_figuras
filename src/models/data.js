// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";//Es solo para conectar con Firebase
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7MS-8fXFj3xc-IGgPdKMm6_db-WXUaEI",
  authDomain: "node-api-figuras.firebaseapp.com",
  projectId: "node-api-figuras",
  storageBucket: "node-api-figuras.firebasestorage.app",
  messagingSenderId: "146271758005",
  appId: "1:146271758005:web:32a94203a9a34cef0ac0fc",
  measurementId: "G-G562W5RCZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Inicializar Firestore
const db = getFirestore(app);
export {db};