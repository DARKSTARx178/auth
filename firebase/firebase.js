import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//CHANGE FROM HERE
const firebaseConfig = {
    apiKey: "YOURAPIKEY",
    authDomain: "YOURAUTHDOMAIN",
    projectId: "YOURPROJECTID",
    storageBucket: "YOURSTORAGEBUCKET",
    messagingSenderId: "YOURMESSAGINGSENDERID",
    appId: "YOURAPPID"
};
//TO HERE

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


