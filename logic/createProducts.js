// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./firebase";
import { addProduct, uploadImages } from "./addProducts";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (e) =>{
    e.preventDefault();
    console.log("funciono");

    const name = productForm.name.value;
    const price = productForm.price.value;
    const quantity = productForm.quantity.value;
    const description = productForm.description.value;
    const images = productForm.images.files;

    let gallery = [];

    if(images.length){
       const uploadedImages = await uploadImages(storage, [...images]);

       gallery = await Promise.all(uploadedImages);


    }

    const newProduct = {
        name,
        price,
        quantity,
        description,
        images: gallery,
    }

    await addProduct(db,  newProduct);
});