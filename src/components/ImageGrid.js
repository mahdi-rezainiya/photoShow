import { deleteDoc , doc} from "firebase/firestore";
import { useFirestore } from "../hooks/useFirestore"
import { db, storage } from "../firebase/config";
import { deleteObject , ref } from "firebase/storage";
import { useState } from "react";
import {motion} from 'framer-motion'; 

export const ImageGrid = ({setSelectedImg}) => {

    const {docs } = useFirestore('images');
    //  console.log(docs);
    const [showDeleteButtons , setShowDeleteButtons] = useState(false)

    const handleDelete = async (e , docId , imageUrl) => {
        e.stopPropagation()
        try{
            await deleteDoc(doc(db , 'images' , docId))

            const imageRef = ref(storage , imageUrl)
            await deleteObject(imageRef)
        }
        catch(err){
            console.log(err);
        }
    }

    const showButtonAfterDelay = () => {
        setTimeout(() => {
            setShowDeleteButtons(true)
        } , 200)
    }

    return (
        <div className="img-grid">
            {
                docs && docs.map(doc => (

                    <motion.div className="img-wrap" 
                    key={doc.id} 
                    onClick={() => setSelectedImg(doc.url)}
                    whileHover={{opacity : 1}}
                    layout
                    onMouseEnter={showButtonAfterDelay}
                    onMouseLeave={() => {setShowDeleteButtons(false)}}
                    >
                        <motion.img src={doc.url} alt="uploade pic" initial={{opacity:0}} animate={{opacity:1}} transition={{delay : 1}} />
                        {showDeleteButtons && 
                        (<button className="delete-button" onClick={e => handleDelete(e , doc.id , doc.url)}>Delete</button>)}

                    </motion.div>

                ))
            }
        </div>
    )
}