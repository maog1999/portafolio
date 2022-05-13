import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./importFirebase"
import { getMyCart } from "./productDetail";
import { getFirebaseCart } from "./cart";

let cart = [];
const cartCounter = document.getElementById("cart__counter");

onAuthStateChanged(auth, async (user) => {
    if (user) {
     
      userLogged = user;
      cart = await getFirebaseCart(db, userLogged.uid);
      cartCounter.innerHTML = `
      <p class="menu__list"><a id="cart__counter" href="./myCart.html">Cart</a>${cart.length}</p>
  
        `;
      console.log(cart.length);

    } else {
        //aca toca cambiar por myCart
        cart = getMyCart();
    }

  });


