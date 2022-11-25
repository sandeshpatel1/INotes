import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom' ;

const Login = (props) => {
    const [cred, setcred] = useState({email : "" ,password : ""})
    const navigate = useNavigate();




   const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
             },
             body: JSON.stringify({email: cred.email , password : cred.password}),
          });
          const json = await response.json();
          console.log(json);
          if (json.success) {
            localStorage.setItem("authToken", json.authToken)
            navigate("/");
            props.showAlert("Login Successfull" , "success")
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
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={cred.email} id="email" name='email' onChange={onchange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" id="password" name='password' value={cred.password} onChange={onchange} className="form-control"/>
  </div>
  <p>Don't have an account? <a href="/signup">Register</a></p>
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login