import { async } from "@firebase/util";
import { db } from "./importFirebase";
import { getProducts } from "./products";

const productSection = document.getElementById("products");
const tshirtsFilter = document.getElementById("tshirtsFilter");
const allFilter = document.getElementById("allFilter");
const sort = document.getElementById("sort");

let products = [];

function getCategory(){
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    return searchParams.get("category");
}

async function loadProducts(){

    const category = getCategory();
    console.log(category);

    const firebaseProducts = await getProducts(db);
    let filteredProducts = [];

    if (category=== "All" || category === null) {
        filteredProducts = firebaseProducts;
    } else {
        filteredProducts = firebaseProducts.filter((product) => product.category === category);
        filterByTshirt();
    }


    filteredProducts.forEach(product => {
        renderProducts(product);
    });
    products = filteredProducts;
}

function renderProducts(item){
    const product = document.createElement("a");
    product.className = "product";
    product.setAttribute("href", `./productDetail?id=${item.id}`);


    const coverImage = item.images ? item.images[0] : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.101-help.com%2Fc0f5234e26-icono-broken-image-en-google-chrome-browser%2F&psig=AOvVaw2pfrdI-2iiP9GY3ImEUq_N&ust=1651205257679000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiqzInxtfcCFQAAAAAdAAAAABAN";


    product.innerHTML = `
        <img src="${coverImage}" alt="" class="product__image">
        <div class="product__info">
            <p class="product__name">${item.name}</p>
            <p class="product__price">${item.price}</p>
        </div>
    `;

    productSection.appendChild(product);
}

function filterByTshirt(){
    const priceOrder = sort.value;
 
    let sortedProducts = [];
    if(priceOrder === "asc"){
        sortedProducts = products.sort((a, b) => 
            b.price - a.price);
    }

    if(priceOrder === "dsc"){
        sortedProducts = products.sort((a, b) => 
            a.price - b.price);
    }

    productSection.innerHTML = "";
    sortedProducts.forEach(product => {
        renderProducts(product);
    });
    console.log(sortedProducts);
}

tshirtsFilter.addEventListener("click", e => {
    filterByTshirt();
});

async function filterByAll(){
    productSection.innerHTML = "";
    products.forEach(product => {
        renderProducts(product);
    });
}

allFilter.addEventListener("click", e => {
    filterByAll();
});

sort.addEventListener("change", e => {
    //filterByAll();
    filterByTshirt();
});
loadProducts();