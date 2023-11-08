
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";



export const HandleImageUrl = async (file) => {
    const storageRef = ref(storage, `images/${file?.name}`);

    // 'file' comes from the Blob or File API
   
    try{
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(ref(storage, `images/${file?.name}`))
        return url
    }catch(e){
         console.error("Error adding product to db: ", e);
    }
}
