import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCl5hoT9NqogExnOUPxRn3CJPN0-hUGVIU',
	authDomain: 'next-firebase-demo-b9ba3.firebaseapp.com',
	projectId: 'next-firebase-demo-b9ba3',
	storageBucket: 'next-firebase-demo-b9ba3.appspot.com',
	messagingSenderId: '589794645494',
	appId: '1:589794645494:web:25724fc46e8ac5036123d7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore()

export default db
export { app }
