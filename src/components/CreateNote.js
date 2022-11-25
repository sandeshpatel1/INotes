import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from "react-router-dom";
import { TextField, Button } from '@mui/material';


const CreateNote = (props) => {
    const context = useContext(noteContext);
     const {addnote} = context
     const navigateto = useNavigate()
     const [note, setnote] = useState({title:"", description:"" , tag:""})
    const handleclick = (e)=>{
        e.preventDefault();
        addnote(note.title,  note.description, note.tag);
        setnote({title:"", description:"" , tag:""});
        props.showAlert("Notes Has Been Added","success");
        navigateto('/')
     }
     const onchange = (e)=>{
        setnote({...note,[e.target.name] : e.target.value})
     }  
  return (
    <div>
        <h2>Add New Notes</h2>
      <div className="mb-3 d-flex " sx={{ width: '50%'}}>
      <TextField color="secondary" size='Normal'
        label="Title"  id="title" name="title" htmlFor="title" variant="outlined"  value={note.title} minLength={5} required onChange={onchange} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label"> Description </label>
        <textarea className="form-control" type="text" id="description" name="description" value={note.description} minLength={5} required onChange={onchange} rows="3"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label"> Tag </label>
        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange}/>
      </div>
      <div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}> Add Note</button>
      </div>

    </div>
  )
}

export default CreateNote