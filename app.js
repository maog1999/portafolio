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
});

    