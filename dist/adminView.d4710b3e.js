const product__form = document.getElementById("product");
const product__name = document.getElementById("product__name");
const product__description = document.getElementById("product__description");
const product__img = document.getElementById("product__image");
const product__price = document.getElementById("product__price");
const product__submit = document.getElementById("product__submit");
product__form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if (product__name.value !== "" && product__description !== "" && product__img !== "" && product__price !== "") {
        const product = {
            name: product__name.value,
            description: product__description.value,
            img: product__img.value,
            price: product__price.value
        };
        console.log("El producto se ha cargado perfectamente");
        console.log(product);
        emptyValues();
    } else console.log("Completa todos los campos requeridos");
});
function emptyValues() {
    product__name.value = "";
    product__description.value = "";
    product__img.value = "";
    product__price.value = "";
}

//# sourceMappingURL=adminView.d4710b3e.js.map
