import React from "react";
import {Button} from "../button";
import {useDispatch, useSelector} from "react-redux";
import {deleteItemFromCollector, setItemInCollector} from "../../redux/collector/reducer";

export const CollectEnt=({disease})=>{
    const dispatch = useDispatch();
    const items = useSelector(state => state.collector.itemsInCollector)
    const isItemInCollector = items.some(item => item.id === disease.id)
    const handleClick = (e) => {
        e.stopPropagation();
        if(isItemInCollector){
            dispatch(deleteItemFromCollector(disease.id))
        } else {
            dispatch(setItemInCollector(disease))
        }
    }
    return(
        <div>
            <Button type={isItemInCollector > 0 ? "secondary" : "primary" } onClick={handleClick}>
                {isItemInCollector ? "Убрать":"Выбрать"}
            </Button>
        </div>
    )
}