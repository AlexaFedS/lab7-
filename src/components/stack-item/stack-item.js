import React from "react";
import './stack-item.css';
import {useDispatch} from "react-redux";
import { AiOutlineCloseCircle} from "react-icons/ai";
import {deleteItemFromCollector} from "../../redux/collector/reducer";

export const StackItem = ({disease}) =>{
    const dispatch = useDispatch();
    const handleClick=()=>{
        dispatch(deleteItemFromCollector(disease.id))
    }
    return(
        <div className="stack-item">
            <div className="stack-item__name">
                <span>{disease.name}</span>
            </div>
            <div className="stack-item__doc">
                <span>{disease.doctor}</span>
                <AiOutlineCloseCircle
                    size={25}
                    className="collect-item__delete-icon"
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}