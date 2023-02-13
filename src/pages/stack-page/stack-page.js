import React from "react";
import './stack-page.css';
import {useSelector} from "react-redux";
import {StackItem} from "../../components/stack-item";

export const StackPage=()=>{
    const items = useSelector(state => state.collector.itemsInCollector);
    if(items.length<1){
        return <h1>Пусто</h1>
    }
    return(
        <div className="stack-page">
            <div className="stack-page__left">
                {items.map(disease => <StackItem disease={disease}/>)}
            </div>
            <div className="stack-page__right">
                <span>
                    {items.length} врачей
                </span>
            </div>
        </div>
    )
}