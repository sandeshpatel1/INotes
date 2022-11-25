import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deletenote} = context;

  const { note , updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title" >{note.title}</h5>
            <div>
              <i className="mx-2 fa-solid fa-trash" onClick={() => { deletenote(note._id);props.showAlert("Note Has Been Deleted","success") }}></i>
              <i className="mx-2 fa-solid fa-pen-to-square"  onClick={()=>{ updateNote(note);}}></i>
              </div>
          </div>
          <p className="card-text" style={{"fontSize": "12px"}} >{note.tag}</p>
          <p className="card-text" >{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
