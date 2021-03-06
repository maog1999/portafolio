import { db, auth } from "./importFirebase"
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { currencyFormat } from "./utils/index";
import { createFirebaseCart, getFirebaseCart } from "./cart";


const productInfoSection = document.getElementById("detail__info");
const productImgSection = document.getElementById("detail__photo");


let cart = [];
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
                <img src="https://firebasestorage.googleapis.com/v0/b/maog-shop.appspot.com/o/images%2Flogo-black.png?alt=media&token=0baf1284-d5f6-4f98-9d0e-0e89dde59004" width="45px" alt="logo">
                <li class="menu__list__black"><a href="./mycart.html">Cart</a> <div id="cartCounter"> ${cart.length}</div></li>
            </div>

            <div class="detail__text visbyMedium">
                <h1 class="detail__text__01">${product.category.toUpperCase()}</h1>
                <h1 class="detail__text__02">${product.category.toUpperCase()}</h1>
                <h1 class="detail__text__03">${product.category.toUpperCase()}</h1>
            </div>

            <div class= "detail__info">
                <h3>${currencyFormat(product.price)}</h3>
                <p>${product.description}</p>
            </div>

            <div class="detail__btn">
            <img src="https://firebasestorage.googleapis.com/v0/b/maog-shop.appspot.com/o/images%2Fcounter.png?alt=media&token=0f9a670c-fa0e-4d11-a8e3-658dda8642fd" width="" alt="contador">
                <button class="cart-button">
                    <span class="add-to-cart">Add to cart</span>
                    <span class="added">Added</span>
                    <i class="fas fa-shopping-cart"></i>
                    <i class="fas fa-box"></i>
                </button>
            </div>
            `
            //<button class="btn__cart">Add to cart</button>

    const cartButtons = document.querySelectorAll('.cart-button');

        cartButtons.forEach(button => {
            button.addEventListener('click', cartClick);
        });

    function cartClick() {
        let button = this;
        button.classList.add('clicked');
    
    }   
    const addToCartBtn = productInfoSection.querySelector(".cart-button");
    const cartCounter = productInfoSection.querySelector("#cartCounter");

    addToCartBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        
        cart.push(product);
        addProductToCart(cart);
        
        if (userLogged) {
            await createFirebaseCart(db, userLogged.uid, cart);
        }

        cartCounter.innerText = cart.length;
        console.log(cart.length);
    });
}

async function addProductToCart(cart){
    localStorage.setItem("cat", JSON.stringify(cart));
}

function getMyCart(){
    const myCart = localStorage.getItem("cart");
    return myCart ? JSON.parse(myCart) : []; 
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
     
      userLogged = user;
      cart = await getFirebaseCart(db, userLogged.uid);

    } else {
        cart = getMyCart();
        
    }
    getProduct("id");
  });


export {
    getMyCart,
    addProductToCart,
    
}
