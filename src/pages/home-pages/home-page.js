import React, {useState} from "react";
import './home-page.css';
import { DiseaseItem } from "../../components/disease-item";
import {Row} from 'react-bootstrap';
import {setIsAuthTrue} from "../../redux/auth/reducer";
import {useDispatch, useSelector} from "react-redux";
import { Redirect} from "react-router";


export const HomePage = () =>  {
/*    let diseases = [
        {
            id: 1,
            name: 'боль в горле',
            description: 'боль в горле',
            doctor: 'терапевт',
        },
        {
            id: 2,
            name: 'боль в животе',
            description: 'боль в животе',
            doctor: 'гастроэнтеролог',
        },
        {
            id: 3,
            name: 'болит зуб',
            description: 'болит зуб',
            doctor: 'стоматолог',
        },
    ]*/
    const item = useSelector(state => state.isAuth.itemInAuth);
    const dispatch = useDispatch();
    const [diseases, setDiseases] = useState([]);
    const getDiseases = async () => {await fetch('http://127.0.0.1:8000/diseases/')
        .then(response => response.json())
        .then(data => setDiseases(data))
        .catch(err => console.log(err));
    };
    const getAuth = async () => { /*проверка аутентификации*/
        await fetch ('http://127.0.0.1:8000/authenticated')
            .then(response=>response.json())
            .then(data=>{
                if(data === "success"){
                    dispatch(setIsAuthTrue());
                }
            });
    };
    getAuth();
    if (item === true){
        getDiseases();
        const disCart = diseases.map(disease => <DiseaseItem key={disease.id} disease={disease}/>)
        return(
            <div className="home-page">
                <Row xs={4} md={4} className="g-4">
                    {disCart}
                </Row>
            </div>
        )
    }
    else {
        return(
            <Redirect to="/login"/>
        )
    }

}