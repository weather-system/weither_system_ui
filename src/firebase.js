// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDJgWFA9zaVymuXd3k_uouB3_6tRwXDSFQ',
  authDomain: 'dlh-cimahi.firebaseapp.com',
  projectId: 'dlh-cimahi',
  storageBucket: 'dlh-cimahi.appspot.com',
  messagingSenderId: '552746096564',
  appId: '1:552746096564:web:a9e5ce090909636e2044e1',
  measurementId: 'G-WTMBK2TJDB',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const storage = getStorage(app)
