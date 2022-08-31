import React, { useEffect  ,useState} from "react"
import { useLocation } from 'react-router-dom';
import "./bookDetails.css"
import axios from 'axios'

export default function BookDetails() {
    const location = useLocation()
    const book =location.state
    const [description, setDescription] = useState("")
    useEffect(() => {
        //Runs only on the first render
        
        axios.get(`https://openlibrary.org${book.key}.json`)
                .then((res) => {
                    if(typeof res.data.description === "string")
                    {
                        setDescription( res.data.description)
                    }
                    else if(typeof res.data.description === "object")
                    {
                       setDescription( res.data.description.value)
                    }
                }
                ) 

      },[]);
    return (
        <>
            <div >
                <div>
                    <div >
                        <div className="modal-body  my-modal-body  ">
                            <div className="p-0 me-2">
                                <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`} className="modal-img" />
                            </div>
                            <div className=" ms-2 ">
                                <div className="header">
                                    <div className="me-2">
                                        <h1 className=" mb-2"> {book.title}</h1>
                                        {book.author_name &&
                                         <p className="  my-2">{book.author_name.join(" | ")}</p>
                                        }
                                       
                                    </div>
                                    <div className="ms-5">
                                        <p>{book.shelf}</p>
                                        <button type="button" className="custom-btn-close" data-bs-dismiss="modal" aria-label="Close"><div><p>-</p></div></button>
                                    </div>
                    
                                </div>
                                {book.publish_date &&  <p>{book.publish_date[0]}</p>}
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}
