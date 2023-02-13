import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import React from "react";


function myCard(){
    return (
        <div className="card" style="width: 18rem;">
            <img src="https://www.google.ru/url?sa=i&url=https%3A%2F%2Fsl-stom.ru%2Fstati%2Fbolit-zub-posle-plombirovaniya%2F&psig=AOvVaw14Ew7KHDdwtqcm7SfmZADF&ust=1671455797444000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCID4pYTLg_wCFQAAAAAdAAAAABAD" className="card-img-top" alt=""/>
            <div className="card-body">
                <h5 className="card-title">Боль в зубе</h5>
                <p className="card-text">Не острая боль и не сильная боль. Проявляется при жевании или перепадах температур.</p>
                <Link to="/стоматолог" className="btn btn-info">Выбрать</Link>
            </div>
        </div>
    )
}
export default myCard;