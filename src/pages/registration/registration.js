import React, {useState} from "react";
import {Button} from "../../components/button";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuthTrue} from "../../redux/auth/reducer";
import {Redirect} from "react-router";

const reg = async (crenditails) => fetch('http://localhost:8000/registration', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "X-CSRFToken": document.cookie
            .split('; ')
            .filter(row => row.startsWith('csrftoken='))
            .map(c => c.split('=')[1])[0]
    },
    body: JSON.stringify(crenditails),
    credentials:'include',
})

export const RegistrationPage = () => {
    const item = useSelector(state => state.isAuth.itemInAuth)
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [re_password, setRe_password] = useState();
    const [mail, setMail] = useState();
    const dispatch = useDispatch();
    const handleSubmit = async e =>{
        e.preventDefault();
        await reg({
            username,
            mail,
            password,
            re_password
        });
        dispatch(setIsAuthTrue());
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)}/>
                </label>
                <label>
                    <p>Mail</p>
                    <input type="text" onChange={e => setMail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setRe_password(e.target.value)}/>
                </label>
                <div>
                    <Button type="primary">Зарегистрироваться</Button>
                </div>
            </form>
            {item ? <Redirect to="/"/> : null}
        </div>
    )
}