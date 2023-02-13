import React from "react";
import {Card} from 'react-bootstrap';
import {CollectEnt} from '../collect-entire'

export const DiseaseItem = ({disease}) => {
    return(
        <div className="disease-item">
            <Card className="card ms-4">
                <Card.Body>
                    <div className="textStyle">
                        <Card.Title>{disease.name}</Card.Title>
                    </div>
                    <div  className="textStyle">
                        <Card.Text>
                            {disease.description}
                        </Card.Text>
                    </div>
                    <CollectEnt disease={disease}/>
                </Card.Body>
            </Card>
        </div>
    )
}