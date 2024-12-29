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
import { toast } from "react-toastify";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC8bs0U_GgqdcxBXh0n1-poV8gA6cfZD2g",
    authDomain: "netflix-clone-5fe68.firebaseapp.com",
    projectId: "netflix-clone-5fe68",
    storageBucket: "netflix-clone-5fe68.firebasestorage.app",
    messagingSenderId: "210998640205",
    appId: "1:210998640205:web:15fde455ebfc4203eca604"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função para cadastro de usuário
const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Adicionar os dados do usuário ao Firestore
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

        toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

// Função para login de usuário
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login realizado com sucesso!");
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

// Função para logout de usuário
const logout = async () => {
    try {
        await signOut(auth);
        toast.success("Você saiu da conta Netflix com sucesso!");
    } catch (error) {
        console.error(error);
        toast.error("Erro ao sair da conta. Tente novamente.");
    }
};

// Exportação das funções e instâncias necessárias
export { auth, db, login, signup, logout };
