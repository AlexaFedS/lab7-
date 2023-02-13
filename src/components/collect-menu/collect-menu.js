import React from "react";
import {Button} from "../button";
import './collect-menu.css';
import {CollectorItem} from "../CollectorItem";

export const CollectorMenu = ({items, onClick}) =>{
    return(
        <div className="collect-menu">
            <div className="collect-menu__list">
                {
                    items.length > 0 ? items.map((disease) => <CollectorItem key={disease.name} name={disease.name} id={disease.id}/>) : 'Пусто'
                }
            </div>
            {
                items.length > 0 ? <div className="collect-menu__arr">
                    <div className="total">
                        <Button type="primary" size="m" onClick={onClick}>
                            Сохранить
                        </Button>
                    </div>
                </div> : null
            }
        </div>
    )
}