import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { useNavigate ,Link} from "react-router-dom";
import { TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const Addnote = (props) => {
    const context = useContext(noteContext);
     const {addnote} = context
     
     const navigateto = useNavigate()
     const [note, setnote] = useState({title:"", description:"" , tag:"#"})
    const handleclick = (e)=>{
        e.preventDefault();
        addnote(note.title,  note.description, note.tag);
        setnote({title:"", description:"" , tag:""});
        navigateto('/');
        

     }
     const onchange = (e)=>{
        setnote({...note,[e.target.name] : e.target.value})
     }  
  return (
    <div className="container mt-4 addnotes" >
    <Button className="mb-4" variant="text" sx={{color:"#009688"}} startIcon={<ArrowBackIcon />} component={Link} to="/" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
    <h2 style={{ fontWeight: "Bold" }}>Create new Note</h2>
    <p className="mb-4">Add a new note with your info / notes</p>
    <form autoComplete="off" noValidate onSubmit={handleclick} >
        <div className="title mb-4">
            <TextField
           sx={{color:"#009688"}} id='title' name='title'
            label="Title" variant="outlined" fullWidth value={note.title} minLength={5} required  onChange={onchange} />
        </div>
        <div className="description mb-4">
          <TextField
             sx={{color:"#009688"}} label="Description" variant="outlined" fullWidth  id='description ' name='description' minLength={5} required  value={note.description} onChange={onchange} />
        </div>
        <div className="tags mb-4">
            <TextField 
            sx={{borderColor:"#009688"}} label="Tags" variant="outlined" fullWidth id='tag' name='tag' value={note.tag} onChange={onchange}/>
        </div>
        <Button disabled={note.title.length<5 || note.description.length<5} type="submit" fullWidth size="large" className="mb-4" variant="contained" sx={{backgroundColor:"#009688"}} style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}>Add Note</Button>
    </form>
</div>

  )
}

export default Addnote