import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";

async function addProduct(db, product){
    try{
        await addDoc(collection(db, "products"), product);
        console.log("product added");
        alert("¡El producto fue creado con exito!")
    }catch(e){
        console.log(e);
    }
}
//Funcion para subir y guardar la imagen con el respectivo nombre
async function imageUploadReference(storage, image){
    const storageRef = ref(storage, `products/images/${image.name}`);
    return await uploadBytes(storageRef, image);
}
async function uploadImages(storage, images = []) {
    const uploadedImages = images.map( async (image) => {
        const imageReference = await imageUploadReference(storage, image);
        
        return getDownloadURL(ref(storage, imageReference.ref.fullPath));
    });

    return uploadedImages;
}

export{
    addProduct,
    uploadImages
}