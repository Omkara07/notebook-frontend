import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "https://notebook-backend-nine.vercel.app"

  // just for the demo
  // const s1 ={
  //     "name" : "Mashiro",
  //     "Category" : "Wifu"
  // }
  // const [state, setState] = useState(s1);
  // const update = ()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name" : "Auyama",
  //             "Category" : "Hot Wifu"
  //         })
  //     }, 1000);
  // }


  const [notes, setNotes] = useState([]);

  // fetch all notes 
  const getNotes = async () => {
    // todo : api call
    // api call
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });

    const json = await response.json()
    setNotes(json)
    
    // setNotes()
  }
  
  
  // Add note 
  const addNote = async (title, description, tag) => {
    // todo : api call
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });

    const note = await response.json()
    setNotes(notes.concat(note))
    // setNotes(json)

    // logic 
  }

  // delete Note 
  const deleteNote = async (id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)

    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }

  // edit Note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json()
    setNotes(json)

    // to create a deep copy of notes
    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit the client 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }

    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState;