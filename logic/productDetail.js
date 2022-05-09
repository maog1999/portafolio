import { async } from "@firebase/util";
import { db, auth } from "./importFirebase"
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { createFirebaseCart, getFirebaseCart } from "./cart";


const productInfoSection = document.getElementById("detail__info");
const productImgSection = document.getElementById("detail__photo");

let cart = getMyCart();
let userLogged = undefined;


function getParam(param){
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);
    return productId;
}

async function getProduct() {
    const productId = getParam("id");
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    const product = {
        ... data,
        id: productId,
    }

    renderProducts(product);
}

function renderProducts (product) {
    productImgSection.style.backgroundImage = `url("${product.images[1]}")`;
    

    productInfoSection.innerHTML = `
            <div class="detail__header">
                <img src="../images/logo-black.png" width="45px" alt="logo">
                <li class="menu__list__black"><a href="#">Cart</a> </li>
            </div>

            <div class="detail__text visbyMedium">
                <h1 class="detail__text__01">${product.category.toUpperCase()}</h1>
                <h1 class="detail__text__02">${product.category.toUpperCase()}</h1>
                <h1 class="detail__text__03">${product.category.toUpperCase()}</h1>
            </div>

            <div class= "detail__info">
                <h3>${product.price}</h3>
                <p>${product.description}</p>
            </div>

            <div class="detail__btn">
                <button>cantidad</button>
                <button class="btn__cart">Add to cart</button>
            </div>
    `

    const addToCartBtn = productInfoSection.querySelector(".btn__cart");
    addToCartBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        
        addProductToCart(cart);
        cart.push(product);
        if(userLogged){
            await createFirebaseCart(db, userLogged.uid, cart);
        }
        
        console.log(cart.length);
    });
}

async function addProductToCart(){
    localStorage.setItem("cat", JSON.stringify(cart));
    await createFirebaseCart(db);

}

function getMyCart(){
    const myCart = localStorage.getItem("cart");
    return myCart ? JSON.parse(myCart) : []; 
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userLogged = user;
      cart = await getFirebaseCart(db, userLogged.uid);
      // ...
    } else {
        cart = getMyLocalCart();
      // User is signed out
      // ...
    }

    //loadProducts();

  });

getProduct("id");
