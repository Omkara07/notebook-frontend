import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const {name, email, password} = credentials;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://notebook-backend-nine.vercel.app/api/auth/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password}),
        });

        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate("/")
            props.showAlert("Account Created Successfully", "success")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <form className="container mx-5" onSubmit={handleSubmit} style={{ color: props.mode === "light" ? "black" : "white"}}>
            <h2 className='my-3'>Login to continue to iNotebook</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label"><h5>Name</h5></label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} style={{ maxWidth: "800px"}} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label"><h5>Email address</h5></label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} style={{ maxWidth: "800px"}} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label"><h5>Password</h5></label>
                <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} style={{ maxWidth: "800px"}}minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label"><h5> ConfirmPassword</h5></label>
                <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credentials.password} style={{ maxWidth: "800px"}} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
