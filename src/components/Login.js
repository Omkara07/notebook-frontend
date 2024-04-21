import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://notebook-backend-nine.vercel.app/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem("token", json.authToken);
            props.showAlert("Logged In Successfully", "success")
            navigate("/")
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <form className="container mx-5 mt-3 " onSubmit={handleSubmit} style={{ color: props.mode === "light" ? "black" : "white" }}>
                <h2 className='my-5'>Login to continue to iNotebook</h2>
                <div className="my-3">
                    <label htmlFor="email" className="form-label"><h5>Email address</h5></label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} style={{ maxWidth: "800px" }} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><h5>Password</h5></label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} style={{ maxWidth: "800px" }} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}
