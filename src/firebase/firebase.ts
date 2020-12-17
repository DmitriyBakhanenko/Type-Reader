import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';

const config = {
  apiKey: 'AIzaSyDMeJRJ1mGAdH92f1-n-3kFU8PUAEWSXyM',
  authDomain: 'type-reader.firebaseapp.com',
  projectId: 'type-reader',
  storageBucket: 'type-reader.appspot.com',
  messagingSenderId: '1033621232370',
  appId: '1:1033621232370:web:af1edb69a19d3edb58ce6b',
};

export const createUserProfileDocument = async (
  userAuth: any,
  additionalData: any
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdDate,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
