import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setnote] = useState(noteInitial);

  //GET NOTES
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
    });
    const json = await response.json();
    console.log(json);
    setnote(json);
  };

  //ADD NOTE
  const addnote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    //setnote(notes.concat(note))
    getNotes(notes.concat(note));
  };

  // Delete  a note
  const deletenote = async (id) => {
    //API CALL TO DELETE NOTE
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
    });
    const json = response.json();
    console.log(json);

    console.log("note has been deleted with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnote(newNotes);
  };
  
  // Edit a note
  const editnote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    console.log(json);
    //LOGIC TO EDIT CLIENT
    //  let newNotes = JSON.parse(JSON.stringify(notes))
    // for (let index = 0; index < newNotes.length; index++) {
    //   const element = newNotes[index];
    //   if (element._id !== id) {
    //     newNotes[index].title = title;
    //     newNotes[index].description = description;
    //     newNotes[index].tag = tag;
    //     break;
    //   }
    // }
    //setnote(newNotes);
    getNotes();
  };

  return (
    <noteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
