import React, { useState } from "react";
import "./auth-page.css";
import { Button } from "../../components/button";
import {setIsAuthTrue} from "../../redux/auth/reducer";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";

async function loginUser(credentials) {
    return fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-CSRFToken": document.cookie
                .split('; ')
                .filter(row => row.startsWith('csrftoken='))
                .map(c => c.split('=')[1])[0]
        },
        body: JSON.stringify(credentials),
        mode:"cors",
        credentials:'include'
    })
        .then(data => data.json())
}

export const AuthPage = () =>{
    const item = useSelector(state => state.isAuth.itemInAuth)
    const dispatch = useDispatch();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
            username,
            password
        });
        dispatch(setIsAuthTrue());
    }
    return(
        <div className="from">
            <form onSubmit={handleSubmit} className="mayaforma">
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <Button type="primary">Submit</Button>
                </div>
            </form>
            {item? <Redirect to="/"/> : null}
        </div>
    )
}



