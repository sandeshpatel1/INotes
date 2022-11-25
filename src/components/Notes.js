import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router';



const Notes = (props) => {
    const navigate = useNavigate()
    const context = useContext(noteContext);
     const {notes, getNotes ,editnote} = context
     useEffect(() => {
      if (localStorage.getItem('authToken')) {
        getNotes()
        console.log(notes)
    } else {
        navigate('/login')
    }
       
      // eslint-disable-next-line
      }, [])


     const [note, setnote] = useState({id:"", etitle:"", edescription:"" , etag:"#"})

     const ref = useRef(null)
     const refClose = useRef(null)

     const updateNote = (currentNote)=>{
      ref.current.click();
      setnote({id : currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag});
      
     }

     const onchange = (e)=>{
      setnote({...note,[e.target.name] : e.target.value})
     }

      const handleclick = (e)=>{
        console.log("Updating the note " , note);
        editnote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Notes Has Been Updated","success");
}

    return (
    <>
    
   
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        
      <div className="mb-3">
        <label htmlFor="etitle" className="form-label"> Title </label>
        <input type="text" id="etitle" name="etitle" className="form-control" value={note.etitle} onChange={onchange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="edescription" className="form-label"> Description </label>
        <textarea className="form-control" type="text" id="edescription" name="edescription" value={note.edescription} onChange={onchange} rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="etag" className="form-label"> Tag </label>
        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange}/>
      </div>
      

      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button"  onClick={handleclick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>

     <div className="container-fluid row mt-10" style={{"width": "100%",  "margin": "0px 0px", "padding": "0px 0px"}}>
       <h1>Your Notes: </h1>
      <div className="container center mb-2" style={{"fontSize" : "28px"}}>
      {notes.length===0 && "ADD NOTE TO PREVIEW HERE"}
      </div>  
      {notes.map((note)=>{
        return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note}/>;
       } 
      )}
    </div>
    </>
  )
}

export default Notes