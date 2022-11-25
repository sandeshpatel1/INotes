import Navbar from "./components/Navbar";
import "./App.css";
import About from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Addnote from "./components/Addnote";


function App() {

   return (
    <>
      <NoteState>
       <BrowserRouter>
            <Navbar />
               <Routes>
                  <Route  path="/" element={<Home  />}   />
                  <Route path="/new" index element={<Addnote />} />
                  <Route path="/about" element={<About />}  />
                  <Route path="/login"  element={<Login  />}  />
                  <Route path="/signup"  element={<Signup  />}  />
                </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
