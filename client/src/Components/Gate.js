import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';

function Gate() {
    const [signup, setSignup] = useState(false)
    const [user, setUser] = useContext(LoginContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])


    function signupToggle(e) {
        e.preventDefault()
        setErrors([])
        setSignup(!signup)
        setUsername('')
        setPassword('')
        setPasswordConfirmation('')
    }

    function onLoginSubmit(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
        .then(res => {
            if(res.ok){
                res.json().then((user) => setUser(user))
            } else {
                res.json().then((err) => setErrors([err.error.login]))
            }
        })
    }

    function onSignupSubmit(e) {
        e.preventDefault()
        const userCreds = {
            username,
            password,
            password_confirmation: passwordConfirmation,
        }
        fetch('/users', {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(userCreds)
        })
        .then(res => {
            if(res.ok){
                res.json().then(
                    setErrors([]),
                    setSignup(!signup),
                    setUsername(''),
                    setPassword(''),
                    setPasswordConfirmation('')
                )
            } else {
                res.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <div>
            {errors ? errors.map((e) => {
                if (e !== "Password confirmation doesn't match Password") {
                    return <div>{e}</div>
                } else {
                    return <div>Passwords do not match!</div>
                }
            }) : undefined}

            {signup ? 
                <form onSubmit={onLoginSubmit}>
                    <label>Log In: </label>
                    <input
                        placeholder ="Username"
                        type="Text"
                        id="username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <input
                        placeholder ="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button type="submit" name="Log In">Log In</button>
                </form>
            :
            <form onSubmit={onSignupSubmit}>
                <label>Sign Up: </label>
                <input
                    placeholder ="Username"
                    type="Text"
                    id="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <input
                    placeholder ="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <input
                    placeholder='Confirm Password'
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <button type="submit" name="Log In">Sign Up</button>
            </form>
            }
            <div>{signup ? "No account?" : "Have an account?"}</div>
            <button onClick={signupToggle}>Click here!</button>
        </div>
    )
}

export default Gate