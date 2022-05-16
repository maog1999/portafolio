import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./importFirebase"
import { getMyCart } from "./productDetail";
import { getFirebaseCart } from "./cart";

let cart = [];
const cartCounter = document.getElementById("cartCounter");

onAuthStateChanged(auth, async (user) => {
    if (user) {
     
      userLogged = user;
      cart = await getFirebaseCart(db, userLogged.uid);
      cartCounter.innerHTML = `
      <li class="menu__list__black"><a href="./myCart.html">Cart</a> <div id="cartCounter"> ${cart.length}</div></li>
  
        `;
      console.log(cart.length);

    } else {
        //aca toca cambiar por myCart
        cart = getMyCart();
    }

  });


