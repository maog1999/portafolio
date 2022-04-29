// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";

import { login, createUser, addUserToDatabase } from "./auth";
import { db, auth} from "./importFirebase";

//Logica para iniciar/registro de sesión
const createUserForm = document.getElementById("createUserForm");
const createUserBtn = document.getElementById("createUserBtn");
const loginForm = document.getElementById("loginForm");
const loginFormBtn = document.getElementById("loginFormBtn");

if(createUserBtn){
    createUserBtn.addEventListener("click", async e =>{
        e.preventDefault();
    
        const name = createUserForm.name.value;
        const lastName = createUserForm.lastName.value;
        const email = createUserForm.email.value;
        const password = createUserForm.password.value;
        const confirmPassword = createUserForm.confirmPassword.value;
        const newUser = {
            name,
            lastName,
            email,
            password,
            isAdmin : false
        }
        if(name !== "" && lastName !== "" && email !== "" && password !== "" && confirmPassword !== "" && password == confirmPassword){
            const userCreated = await createUser(auth, newUser);
            await addUserToDatabase(db, userCreated.uid, newUser);
        
            alert(`Bienvenido, ${ name }`);
            console.log("creando user");
            console.log(userCreated);
    
        }if(password !== confirmPassword){
            alert("Las contraseñas no coinciden");
        }
    });
}

if(loginFormBtn){
    loginFormBtn.addEventListener("click", async (e) =>{
        e.preventDefault();
    
        console.log("entro");
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const user = await login(auth, db, email, password);
        console.log(user);
    
        if(user.isAdmin){
            location.href = "./adminView.html"
        }else{
            location.href = "./mycart.html"
    
        }
    });
}


    