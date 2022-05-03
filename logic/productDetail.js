import { async } from "@firebase/util";
import { db } from "./importFirebase"
import { doc, getDoc } from "firebase/firestore";

const productInfoSection = document.getElementById("detail__info");
const productImgSection = document.getElementById("detail__photo");


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
   /* productImgSection.innerHTML = `
        document.body.style.backgroundImage = "url('/images/productExample2.jpg')"
    `;*/

    productInfoSection.innerHTML = `
            <div class="detail__header">
                <object data="./images/logo.svg" width="45px" type=""></object>
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
}



getProduct("id");
