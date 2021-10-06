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
    const { name, password } = userAuth;
    const createdDate = new Date();

    try {
      await userRef.set({
        name,
        password,
        createdDate,
        ...additionalData,
      });
    } catch (error) {
      console.error('error creating user', error.message);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export default firebase;
