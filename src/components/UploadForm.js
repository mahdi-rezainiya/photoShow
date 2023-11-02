import { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function UploadForm() {

    const [file , setFile] = useState(null);
    const [error , setError] = useState(null);
    const types = ['image/jpeg' , 'image/png'];

    const handleChange = (e) => {
        let selected = e.target.files[0]
        // console.log(selected);
        // console.log("changed");
        if(selected && types.includes(selected.type)){
            setFile(selected)
            setError('')
        }
        else{
            setFile(null)
            setError('Please Select an Image File (png or jpeg)')
        }
    }

    return (
        <form>
            <label>
                <input type="file" onChange={handleChange} />
                <span>+</span>
            </label>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div className="file">{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </form>
    )
}
