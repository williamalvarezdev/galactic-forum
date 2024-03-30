import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, email, password });
        signUp();
        setEmail("");
        setEmail("");
        setPassword("");
    };

    // server response update signup function
const navigation = useNavigate();

const signUp = () => {
    fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            username,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.json())
        .then(data => {
            if(data.error_message){
                alert(data.error_message);
            } else {
                alert("Account created successfully!");
                navigate("/");
            }
        })
        .catch(err => console.error(err));
};


    return (
        <main className='register'>
            <h1 className='registerTitle'>Log into your account</h1>
            <form className='registerForm' onSubmit={ handleSubmit }>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='email'>Email Address</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='registerBtn'>Register</button>
                <p>
                    Have an account? <Link to='/'>Sign in</Link>
                </p>
            </form>
        </main>
    );
};

export default Register;