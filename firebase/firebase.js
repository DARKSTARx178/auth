import { initializeApp } from "firebase/app";
//Changed
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

//Changed
export const auth = getAuth(app);


