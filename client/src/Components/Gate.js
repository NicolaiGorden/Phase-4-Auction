import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../App';

function Gate() {
    const [user, setUser] = useContext(LoginContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState('')

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
                res.json().then((err) => console.log(err))
            }
        })
    }

    function onSignupSubmit(e) {
        e.preventDefault()
    }

    function onLogout(e) {
        e.preventDefault()
        fetch("/logout", {
            method: "DELETE",
        })
    } 

    return (
        <div>
            <div>{errors}</div>
            <form onSubmit={onLoginSubmit}>
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
            <form onSubmit={onSignupSubmit}>
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
            <button onClick={onLogout}>Log Out</button>
        </div>
    )
}

export default Gate