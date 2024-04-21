import React , {useContext} from 'react'
import noteContext from "../context/noteContext";

export default function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, mode ,updateNote } = props;
    return (
        <>
            <div className='col-md-3 my-3' style={{ color: mode === "light" ? "black" : "white" }}>
                <div className={`card text-bg-${mode === "light" ? "light" : "dark"} border border-success mb-2 border-2`} style={{ maxWidth: "700px" }}>
                    <div className="card-header">
                        <strong>{note.title}</strong>
                    </div>
                    <div className="card-body">
                        {note.description}
                    </div>
                    <div className="container">
                        <i className="fa-regular fa-pen-to-square mx-2 my-2" onClick={async ()=>{updateNote(note)}}></i>
                        <i className ="fa-regular fa-trash-can mx-3 my-2" onClick={()=>{
                            deleteNote(note._id);
                            props.showAlert("Deleted Successfuly", "success")
                        }}></i>
                    </div>
                </div>
            </div>
        </>
    )
}
