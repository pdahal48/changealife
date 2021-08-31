import React, { useState } from 'react'
import { Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faUser} size="6x"/>

const Login = ({ loginUser }) => {
    const [flag, setFlag] = useState(false)
    const [value, setValue] = useState(null)

    const history = useHistory()
    const [loginFormData, setloginFormData] = useState({
        username: "",
        password: ""
    });

    async function handleSubmit(e) {
        console.log(`submitted`)
        e.preventDefault()
        let user = await loginUser(loginFormData)
        if(user.success){
            history.push('/')
        } else {
            setFlag(true)
            setValue(user.errors[0])
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setloginFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div>
        <Row className="justify-content-center text-center">
        <Col className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2">
            {flag && 
            <Alert variant="warning">{value}</Alert>
            }
            <div className = "display-4">Login</div>
            <div className = "card my-4">
                <div className = "card-body">
                    <Row className="login-icon justify-content-center">
                        <Col className="col-3 mb-2">
                            {element}
                        </Col>
                    </Row>
                <Col>
                <Form onSubmit = {handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Control 
                            type="text" 
                            name = "username"
                            placeholder="Username"
                            value = {loginFormData.username}
                            onChange = {handleChange}
                            />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control 
                            type="password"
                            name = "password"
                            placeholder="Password"
                            value = {loginFormData.password}
                            onChange = {handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Control 
                            type="submit"
                            value = "Submit"
                            className="btn btn-primary mt-3"
                        />
                    </Form.Group>
                    {/* <input
                            type="submit"
                            value="Submit"
                            className="btn btn-primary mt-3"
                    />
                    </Form.Group> */}
                </Form>
                </Col>
                </div>
                </div>
                </Col>
        </Row>
        </div>
    )
}

export default Login;