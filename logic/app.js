// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeo9EJqc6RI1v4uEhfMgTFF7M0UBYd7tg",
  authDomain: "maog-shop.firebaseapp.com",
  projectId: "maog-shop",
  storageBucket: "maog-shop.appspot.com",
  messagingSenderId: "948192743979",
  appId: "1:948192743979:web:d72038644bfcd3b81e506e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//Logica para iniciar/registro de sesión
const createUserForm = document.getElementById("createUserForm");
const createUserBtn = document.getElementById("createUserBtn");
const loginForm = document.getElementById("loginForm");
const loginFormBtn = document.getElementById("loginFormBtn");

createUserBtn.addEventListener("click", e =>{
    e.preventDefault();

    const name = createUserForm.name.value;
    const lastName = createUserForm.lastName.value;
    const email = createUserForm.email.value;
    const password = createUserForm.password.value;
    const confirmPassword = createUserForm.confirmPassword.value;
    createUser(name, email, password);
    console.log("creando user");
});

loginFormBtn.addEventListener("click", e =>{
    e.preventDefault();

    console.log("entro");
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    login(email, password);
});

//---------------------------------
//Función login
async function login (email, password){
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
async function createUser(name, email, password){
    try{
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        alert(`Bienvenido, ${user.email}`);
        console.log(user);
    }catch(e){
        if(e.code === "auth/weak-password") {
            alert("Tu contraseña debe tener al menos 6 caracteres");
        }
    
        if(e.code === "auth/email-already-in-use") {
            alert("Este correo ya se encuentra en uso");
        }
    }

}



/*
const user = {
    name: "",
    gender: "",
    age: "",
    email: "",
    password: "",
};

const products = [
    {
        name: "art_01",
        description: "Special an unique piece of art",
        img: "../images/Maskgroup.png",
        price: 30000,
        quantity: 5,
    },

    {
        name: "art_02",
        img: "../images/Maskgroup-1.png",
        description: "Special an unique piece of art",
        price: 60000,
        quantity: 10,
    },

    {
        name: "art_03",
        img: "../images/Maskgroup-2.png",
        description: "Special an unique piece of art",
        price: 90000,
        quantity: 8,
    },

    {
        name: "art_04",
        img: "../images/Maskgroup-3.png",
        description: "Special an unique piece of art",
        price: 25000,
        quantity: 4,
    },

    {
        name: "art_05",
        img: "../images/Maskgroup.png",
        description: "Special an unique piece of art",
        price: 60000,
        quantity: 4,
    },
];

//ahtepsilon
//appendchild al final

//crear un elemento contenedor
//se debe primero hacer un div en el html para luego llamarlo en el js con un id
//let nombre = document.getElementById("nombre del id en el html");
//luego crear el div que va a contener todo --> const nombre = document.createElement("div");
//template strings - ``

//product.innerHTML = `
//<h1 class="product__description">${nombre.description} </h1>
//<p class="product__price">${nombre.price} </p>
//<img class="product__img" src="${nombre.img}">
//`;

//nombre.appendChild(nombreVar);
const { name: nameUser, gender, age, email, password } = user;

const divInventory = document.getElementById("inventory");



products.forEach( product => {
    const { name : nameProduct, img, description, price, quantity} = product;
    if (price > 50000 && quantity > 0) {
        console.log(nameProduct);
    }

    const productsDiv = document.createElement("div");

    productsDiv.innerHTML = `
    <h1 class="product__name">${nameProduct}</h1>
    <img class="product__img" src="${img}">
    <h3 class="product__description">${description}</h3>
    <p class="product__price">${price}</p> 
    <p class="product__quantity">${quantity}</p>
    `
    divInventory.appendChild(productsDiv);
});*/

    