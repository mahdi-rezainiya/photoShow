import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFirestore = (collectionName) => {
    
    const [docs , setDocs] = useState([]);

    useEffect(() => {
        const q = query(collection(db , collectionName) , orderBy('createAt' , 'desc'));

        const unsub = onSnapshot(q , (snapshot) => {
            let documents = []
            snapshot.forEach(doc => {
                documents.push({...doc.data() , id : doc.id})
            })
            setDocs(documents)
        })
        return () => unsub()

    } , [collectionName])

    return { docs }
}