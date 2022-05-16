import { auth, db } from "./importFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseCart, createFirebaseCart } from "./cart";
import { getMyCart, addProductToCart } from "./productDetail";
import { currencyFormat } from "./utils/index";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
 
let total = 0;
let cart = [];
let userLogged = undefined;
const cartResume = document.getElementById("cart__resume");
const cartPriceTotal = document.getElementById("cart__total__info__inside");
const checkoutInfo = document.getElementById("checkoutInfo");
const btnCheckout = document.getElementById("btnCheckout");

function loadCart(cart) {
  total = 0;
  cart.forEach(product => {
    renderProducts(product);
    total += parseInt(product.price);
  });
  
  const cartTotal = document.createElement("div");

  cartTotal.innerHTML = `
    <p>Total payment is:</p>
    <h1>${currencyFormat(total)}</h1>
    
  `;

  cartPriceTotal.appendChild(cartTotal);
  
  console.log(currencyFormat(total));
  
};

async function removeProducts(productId){
  const newCart = cart.filter(product => product.id !== productId);
  cart = newCart;

  if(userLogged) {
    await createFirebaseCart(db, userLogged.uid, newCart);
  }
  addProductToCart(newCart);
  cartResume.innerHTML = "";
  cartPriceTotal.innerHTML = "";
  
  loadCart(newCart);
}

function renderProducts(product) {
  const productCart = document.createElement("li");
  productCart.className = "cart__resume__list";

  productCart.innerHTML = `
  <img class="product_img" src="${product.images[0]}" alt="producto" width="165">
  <div>
      <h3>${product.name}</h3>                
      <p>${product.color} / size: ${product.size} </p>
  </div>
  <div>
      <p class="product__price">${currencyFormat(product.price)}</p>
  </div>
  <div>
      <img class="img-remove" src="https://firebasestorage.googleapis.com/v0/b/maog-shop.appspot.com/o/images%2Fremove-btn.png?alt=media&token=1d8286da-7b6b-4af3-85bc-1ecb089339f9" alt="remove_btn" width="32px">
  </div>
  `;

  cartResume.appendChild(productCart);

  productCart.addEventListener("click", e => {
    e.preventDefault();
    if(e.target.tagName === "IMG"){
      removeProducts(product.id);
    }
  });
};

//----------Checkout------------
const deleteCart = async () => {
  try {
    await deleteDoc(doc(db, "cart", userLogged.uid));
    loadCart([]);
    console.log("actulizando...");
  } catch(e) {
    console.log(e);
  }
  window.location.reload();
}

const createOrder = async (userData) => {
  try {
    const order = await addDoc(collection(db, "orders"),{
      ...userData, 
      products: cart,
      total
    });
    alert(`Gracias ${userData.name}, tu orden ${order.id} va en camino`);

    deleteCart();
  }catch(e){
    console.log(e);
  }
};

btnCheckout.addEventListener("click", e => {
  e.preventDefault();
  const name = checkoutInfo.name.value;
  const id = checkoutInfo.id.value;
  const adress = checkoutInfo.adress.value;

  
  const userData = {
    name, 
    id,
    adress
  }

  if(cart.length){
    if(name && id  && adress) {
      createOrder(userData);
    } else {
      alert("Completa todos los campos");
    }
  } else{
    alert("Aún no tienes productos en el carrito :(")
  }
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
     
      userLogged = user;
      cart = await getFirebaseCart(db, userLogged.uid);

    } else {
        cart = getMyCart();
     
    }
    loadCart(cart);

  });