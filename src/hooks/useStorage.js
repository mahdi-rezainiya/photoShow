import { useEffect, useState } from "react";
import {db , storage} from "../firebase/config";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const useStorage = (file) => {
    const [progress , setProgress] = useState(0);
    const [error , setError] = useState(null);
    const [url , setUrl] = useState(null);

    useEffect(() => {
        const collectionRef  = collection(db , 'images');
        const storageRef = ref(storage , file.name);
        const uploadTask = uploadBytesResumable(storageRef , file);

        const unsub = uploadTask.on('state_changed' ,
            (snapshot) => {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
            setProgress(percentage)},

            (err) => {setError(err)} ,
        
            async () => {
            const downloadURL  = await getDownloadURL(storageRef)
            setUrl(downloadURL)

            const createAt = serverTimestamp();
            await addDoc(collectionRef , { url : downloadURL , createAt })
        })

        return () => unsub()

    } , [file])

    return { progress , url , error }
}