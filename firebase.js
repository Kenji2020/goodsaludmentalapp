import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqFzGeSbCdUPMGDv8TONyyJ4O_RRfk1sg",
    authDomain: "goodsaludmental.firebaseapp.com",
    projectId: "goodsaludmental",
    storageBucket: "goodsaludmental.appspot.com",
    messagingSenderId: "892144031733",
    appId: "1:892144031733:web:6b3c1a7bd85602225f32bc"
  };


let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
export const createUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = db.doc(`users/${user.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email } = user;
        const { displayName } = additionalData;

        try {
            await userRef.set({
                displayName,
                email,
                createdAt: new Date(),
            });
        } catch (error) {
            console.log('Error in creating user', error);
        }
    }
};
