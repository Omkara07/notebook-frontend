import React, { useContext, useState } from 'react'
import noteContext from "../context/noteContext";

export default function Addnote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-4" style={{ color: props.mode === "light" ? "black" : "white" }}>
            <h2>Add Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name='title'
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        style={{ maxWidth: "800px" }}
                        minLength={5}
                        required
                        value={note.title}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name='description'
                        onChange={onChange}
                        style={{ maxWidth: "800px" }}
                        minLength={5}
                        required
                        value={note.description}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                        tag
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name='tag'
                        onChange={onChange}
                        style={{ maxWidth: "800px" }}
                        value={note.tag}
                    />
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>
                    Add Note
                </button>
            </form>
        </div>
    )
}
