import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {setIsAuthFalse} from "../../redux/auth/reducer";

const exit = async () => fetch('http://localhost:8000/logout',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "X-CSRFToken": document.cookie
            .split('; ')
            .filter(row => row.startsWith('csrftoken='))
            .map(c => c.split('=')[1])[0]
    },
});
export const LogoutPage = () => {
    const dispatch = useDispatch();
    exit();
    dispatch(setIsAuthFalse());
    return(
        <div>
            <h1>Вы вышли из системы</h1>
            <Link to="/login">Войти в систему</Link>
        </div>
    )
}