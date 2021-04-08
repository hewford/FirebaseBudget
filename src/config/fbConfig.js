import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
export const config = {
  apiKey: "AIzaSyBlfVg-c1PQJbtyqZjXsG0qTO_SybEaeb8",
  authDomain: "fir-budget-dde79.firebaseapp.com",
  databaseURL: "https://fir-budget-dde79.firebaseio.com",
  projectId: "fir-budget-dde79",
  storageBucket: "fir-budget-dde79.appspot.com",
  messagingSenderId: "166443749788"
};
firebase.initializeApp(config);
firebase.firestore();

const firestore = firebase.firestore();
const settings = {/* your settings... */ /* timestampsInSnapshots: true */ };
// const settings = {/* your settings... */ timestampsInSnapshots: true };

firestore.settings(settings);

export const auth = firebase.auth();
export default firebase