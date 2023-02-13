import React, {useCallback, useState} from "react";
import { BsCollection } from 'react-icons/bs';
import './collection-block.css';
import { CollectorMenu } from "../collect-menu";
import {useSelector} from "react-redux";
import { ItemsInCollector } from "../items-in-collector";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

export const CollectionBlock = () => {
    const [isCollectorMenuVisible, setIsCollectorMenuVisible] = useState(false);
    const items = useSelector(state => state.collector.itemsInCollector);
    const history = useHistory();
    const handleClick = useCallback(()=>{
        setIsCollectorMenuVisible(false);
        history.push("/stack")
    }, [history]);
    return(
        <div className='collection-block'>
            <ItemsInCollector quantity={items.length}/>
            <BsCollection size={24} onClick={() => setIsCollectorMenuVisible(!isCollectorMenuVisible)}/>
            <Link to="/stack"> { isCollectorMenuVisible && <CollectorMenu items={items} onClick={handleClick}/>}</Link>
        </div>
    )
}