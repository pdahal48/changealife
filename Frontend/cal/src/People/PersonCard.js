import React from 'react'
import { Card, Button } from 'react-bootstrap';

//Renders a simple Person card with their image, name, age, and highlight
//for the people's page
const PersonCard = ({ username, src, fullname, age, highlight }) => {
  return (
      <div className="container-fluid" >
        <a className = "custom-card" href = {`/users/${username}`} key={username}>
        <Card className = "personCard" >
        <Card.Img variant="top" src={src} />
        <Card.Body>
          <Card.Title className = "text-left">{fullname}, {age}</Card.Title>
          <Card.Text>
                {highlight}
          </Card.Text>
        </Card.Body>
          <Button> Donate</Button>
        </Card>
      </a>
      </div>
  )
}

export default PersonCard;