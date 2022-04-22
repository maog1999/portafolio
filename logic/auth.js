import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


//Función login
async function login (auth, email, password){
    try{
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        alert(`Bienvenido, usuario ${user.email}`);

    }catch(e){
        console.log(e);
        alert("Correo o contraseña inválida :(");
    }
}

//---------------------------------
//Funcion registrar usuarios
async function createUser(auth, { email, password}){
    try{
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        console.log(user);
        
        return user;
    }catch(e){
        if(e.code === "auth/weak-password") {
            alert("Tu contraseña debe tener al menos 6 caracteres");
        }
    
        if(e.code === "auth/email-already-in-use") {
            alert("Este correo ya se encuentra en uso");
        }
    }
}

async function addUserToDatabase(db, userId, userInfo){
    try{
        await setDoc(doc(db, "users", userId), userInfo);

    }catch(e){
        console.log(e);
    }
}

export{
    login,
    createUser,
    addUserToDatabase
}