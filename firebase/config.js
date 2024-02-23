/* eslint-disable prettier/prettier */
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: 'AIzaSyBNipN3BdmgQRD2M0z4WweAiLsc1eGDpAg',
  authDomain: 'restaurant-af453.firebaseapp.com',
  databaseURL: 'https://restaurant-af453-default-rtdb.firebaseio.com',
  projectId: 'restaurant-af453',
  storageBucket: 'restaurant-af453.appspot.com',
  messagingSenderId: '502501025133',
  appId: '1:502501025133:web:b52f73c9307ad685e46664',
  measurementId: 'G-JF2TF95QLD',
};
export default firebaseConfig;
export const appFirebase = initializeApp(firebaseConfig);
