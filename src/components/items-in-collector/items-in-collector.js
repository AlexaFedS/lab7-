import React from "react";
import './items-in-collector.css';

export const ItemsInCollector=({
    quantity = 0
                               })=>{
    return quantity > 0 ? (
        <div className="items-in-collector">
            {quantity}
        </div>
    ) : null
}