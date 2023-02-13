import React from "react";
import './collector-item.css';

export const CollectorItem = ({name, id}) =>{
    return(
        <div className="collector-item">
            <span>{name}</span>
        </div>
    )
}