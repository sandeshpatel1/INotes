import Notes from "./Notes";
import React  from 'react';
import noteimg from "../Images/img-fluid.jpg"
import { Button  } from '@mui/material';
import { Link  } from "react-router-dom";

function Home(props) {

  
   return (
    <>
   <div className="container-fluid d-flex"  style={{"height": "100vh" , "padding": "0px 0px"}}>
      < div className="col-md-5" style={{"width":"50%", "alignItems" : "center" , "textAlign" : "center", "display": "block", "margin":"auto"}}>
        <h1 className="display-1 pt-5 ps-5 respo"><span style={{ color: "#009688" }}>i</span>Notebook</h1>
        <p className="ps-5 respo" style={{ fontSize: "1.7rem", fontWeight: "bold" }}>Your notebook on cloud - safe and secure</p>
        <p className="ps-5 mt-3 respo" style={{ fontSize: "1rem" }}>An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee. For more info you can checkout ourAbout Page  </p>
        <div className="d-flex justify-content-center">
        <Button component={Link} to={'/new'} variant="contained" sx={{color:"#009688"}} style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Create New Note</Button>
        </div>
      
    </div>
      <div className="col-md-7 d-flex flex-column align-items-center" style={{"width":"50%"}}>
        <img className="img-fluid" style={{width: "100%", height:"100vh"}} src={noteimg} alt="iNotebook" />
      </div>
    </div>
     <div style={{"marginTop" : "20px"}}>
      <Notes  />
      </div>

   
    </>
  );

  
}

export default Home;
