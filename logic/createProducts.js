// Import the functions you need from the SDKs you need
import { addProduct, uploadImages } from "./addProducts";
import { storage, db } from "./importFirebase";

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    console.log("funciono");

    const category = productForm.category.value;
    const name = productForm.name.value;
    const price = productForm.price.value;
    const quantity = productForm.quantity.value;
    const description = productForm.description.value;
    const size = productForm.size.value;
    const color = productForm.color.value;
    const images = productForm.images.files;

    let gallery = [];

    if(images.length){
       const uploadedImages = await uploadImages(storage, [...images]);

       gallery = await Promise.all(uploadedImages);


    }

    const newProduct = {
        category,
        name,
        price,
        quantity,
        description,
        size,
        color,
        images: gallery,
    }

    await addProduct(db,  newProduct);
});