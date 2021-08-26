import React from 'react'
import { Row, Col } from 'react-bootstrap';

const SuccessStories = ({ src, story }) => {
    return (
        <div>
            <div>
            <Row className="container-fluid justify-content-center  mt-3">
            <Col className="success-image col-xs-12 col-sm-12 col-xl-5 mb-5">
                <img style={{height: "100%", width:"100%"}} src={src} alt={'success'}/>
            </Col>
            <Col className="col-xs-12 col-sm-12  col-xl-3">
                <p className = "display-5 mb-3" style={{fontSize:"1.5rem", marginLeft:"10px"}}>
                    {story}
                </p>
            </Col>
            </Row>
        </div>
        </div>
    )
}

export default SuccessStories;