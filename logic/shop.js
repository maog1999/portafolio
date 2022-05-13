import { async } from "@firebase/util";
import { db } from "./importFirebase";
import { getProducts } from "./products";
import { currencyFormat } from "./utils/index";


const productSection = document.getElementById("products");
const sort = document.getElementById("sort");
const filter = document.getElementById("filter");

//aplicarle filtros a este arreglo porque ya todos estan aca
let products = [];

function getCategory(){
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    return searchParams.get("category");
}

async function loadProducts(){

    const category = getCategory();
    

    const firebaseProducts = await getProducts(db);
    let filteredProducts = [];

    if (category=== "All" || category === null) {
        filteredProducts = firebaseProducts;

    }else {
        filteredProducts = firebaseProducts.filter((product) => product.category === category);
    }

    filteredProducts.forEach(product => {
        renderProducts(product);
    });
    products = filteredProducts;
}



function renderProducts(item){
    const product = document.createElement("a");
    product.className = "product";
    product.setAttribute("href", `./productDetail.html?id=${item.id}`);


    const coverImage = item.images ? item.images[0] : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.101-help.com%2Fc0f5234e26-icono-broken-image-en-google-chrome-browser%2F&psig=AOvVaw2pfrdI-2iiP9GY3ImEUq_N&ust=1651205257679000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiqzInxtfcCFQAAAAAdAAAAABAN";


    product.innerHTML = `
        <img src="${coverImage}" alt="" class="product__image">
        <div class="product__info">
            <p class="product__name">${item.name}</p>
            <p class="product__price">${currencyFormat(item.price)}</p>
        </div>
    `;

    productSection.appendChild(product);
}


async function filtersAction(){
    const sortValue = sort.value;
    const filterValue = filter.value;
    console.log(filterValue);

    let sortedProducts = [];
 
    //--------Sort by----------
    if(sortValue === "asc"){
        sortedProducts = products.sort((a, b) => 
            b.price - a.price);
    }

    if(sortValue === "dsc"){
        sortedProducts = products.sort((a, b) => 
            a.price - b.price);
    }

    if(sortValue === "nameAsc") {
        sortedProducts = products.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }

    if(sortValue === "nameDsc") {
        sortedProducts = products.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
    }

    if(sortValue === "quantityAsc") {
        sortedProducts = products.sort((a, b) => b.quantity - a.quantity)
    }

    if(sortValue === "quantityDsc") {
        sortedProducts = products.sort((a, b) => a.quantity - b.quantity)
    }
    
    //---------Filter by-----------
    if(filterValue === "S" || filterValue === "M" || filterValue === "L") {
        sortedProducts = products.filter((product) => product.size === filterValue);
    }

    if(filterValue === "black" || filterValue === "white" || filterValue === "gray") {
        sortedProducts = products.filter((product) => product.color === filterValue);
    }


    productSection.innerHTML = "";
    sortedProducts.forEach(product => {
        renderProducts(product);
    });
    console.log(sortedProducts);
    console.log(sortValue);

}


sort.addEventListener("change", e => {
    filtersAction();
});

filter.addEventListener("change", e => {
    filtersAction();
})

loadProducts();