import React from 'react'
import {Card, Button} from 'react-bootstrap'

//Renders a simple person card with its name, description and an image
const PersonListCard = ({ username, src, name, city, state, highlight, shelter }) => {
    return (
        <div className="container-fluid">
        <a  className = "custom-card-2" href = {`/users/${username}`}>
         <Card className = "mt-3 mb-3">
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <Card.Img classname="card-img" src={src} />
                </blockquote>
            <Card.Text>
                {highlight}
            </Card.Text>
            <Card.Text>
                Name: {name} <br></br>
                City: {city}<br></br>
                State: {state}<br></br>
                Shelter: {shelter}
            </Card.Text> 
            <Button> Donate</Button>
            </Card.Body>
            </Card>
        </a>
    </div>
    )
}

export default PersonListCard;