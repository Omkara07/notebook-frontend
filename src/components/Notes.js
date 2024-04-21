import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login")
        }

    })

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({etitle:"", edescription:"", etag:"default"})
    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfuly", "success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }    

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag: currentNote.tag})
    }

    return (
        <>
            <Addnote mode={props.mode} showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className={`modal fade`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog bg-dark" style={{ color: props.mode === "light" ? "black" : "white"}}>
                    <div className={`modal-content `} style={{ backgroundColor: props.mode === "light" ? "white" : "#1c1c1c"}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name='etitle'
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                        style={{ maxWidth: "800px" }}
                                        value={note.etitle}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name='edescription'
                                        onChange={onChange}
                                        style={{ maxWidth: "800px" }}
                                        value={note.edescription}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">
                                        tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name='etag'
                                        onChange={onChange}
                                        style={{ maxWidth: "800px" }}
                                        value={note.etag}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-4" style={{ color: props.mode === "light" ? "black" : "white" }} >
                <h2>Your Notes</h2>
                <div className="container mx-3">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem note={note} mode={props.mode} updateNote={updateNote} key={note._id} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    )
}
