import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC8bs0U_GgqdcxBXh0n1-poV8gA6cfZD2g",
    authDomain: "netflix-clone-5fe68.firebaseapp.com",
    projectId: "netflix-clone-5fe68",
    storageBucket: "netflix-clone-5fe68.firebasestorage.app",
    messagingSenderId: "210998640205",
    appId: "1:210998640205:web:15fde455ebfc4203eca604"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, passoword) => {

    try {
        const res = await createUserWithEmailAndPassword(auth, email,
            passoword);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error)
        alert(error);
    }
}


const login = async (email, passoword) => {
    try {
        await signInWithEmailAndPassword(auth, email, passoword);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };