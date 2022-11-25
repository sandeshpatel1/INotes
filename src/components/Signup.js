import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom' ;

const Signup = (props) => {
    const [cred, setcred] = useState({name: "", email : "" ,password : ""})
    const navigate = useNavigate();

  const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
             },
             body: JSON.stringify({name : cred.name, email: cred.email , password : cred.password}),
          });
          const json = await response.json();
          console.log(json);

          if (json.success) {
            localStorage.setItem("authToken", json.authToken)
            props.showAlert("Account Created Successfully" , "success")
            navigate("/");
            
          } else {
           props.showAlert("Invalid Credentials" , "danger")
          }
    }

    const onchange = (e)=>{
        setcred({...cred,[e.target.name] : e.target.value})
       }

  return (
    <div className='container my-3 center'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" className="form-control" id="name" name='name' onChange={onchange} aria-describedby="name" required />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"  id="email" name='email' onChange={onchange} aria-describedby="emailHelp" required />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" id="password" name='password' onChange={onchange} className="form-control" minLength={6} required />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">I have read the term and conditions</label>
  </div>
  <button type="submit" className="btn btn-primary">Register Now</button>
  <div className='container my-2'>
  <p>Already have an account? <a href="/login">Login</a></p>
  </div>
</form>
    </div>
  )
}

export default Signup