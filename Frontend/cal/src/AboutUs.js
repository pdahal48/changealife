import React from 'react'
import { Row, Col } from 'react-bootstrap';


const AboutUs = () => {
    return (
        <div className="container ml-5 mr-5 pl-5 pr-5">
            <Row className="justify-content-center">
                <Col className="col-8 text-center mt-3" style={{border:"2px solid grey"}}>
                <br></br> <b>At this time, the site is still under development and is only a model.</b><br></br>

                    Hello! My name is Prem Dahal. I am an upcoming fullstack software engineer.
                    This site is intended to help donors reach people facing homeless and help them directly.
                    If you have any questions or comments, feel free to
                    <div>
                        <a href="mailto:prem.dahal01@gmail.com">
                            email me. 
                        </a>
                    </div>
                    I appreciate your support!
                    <div className="text-center mt-2">
                        If you run a shelter and would like to enroll, please
                            <a href="mailto:prem.dahal01@gmail.com">
                                {` contact me `}
                            </a>
                         with your shelter information
                    </div>
                    <div className="text-center mt-2">
                        If you are facing homeless and would like to add yourself to the site, please sign up! 
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default AboutUs;