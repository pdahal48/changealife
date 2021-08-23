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
            e.preventDefault()
            let user = await loginUser(loginFormData)
            if(user.success){
                history.push('/')
                window.location.reload()
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
        <Row className="justify-content-center">
            <Col className="col-2 mt-5 mb-5">
            {flag && 
            <Alert variant="warning">{value}</Alert>
            }
            <div className = "display-4">Login</div>
            <div className = "card my-2">
                <div className = "card-body">
                    <Row className="container justify-content-center">
                        <Col className="col-3 mb-4">
                            {element}
                        </Col>
                    </Row>
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

                <Form.Group className="mb-5">
                    <Form.Control 
                        type="password"
                        name = "password"
                        placeholder="Password"
                        value = {loginFormData.password}
                        onChange = {handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className = "position-absolute bottom-0 end-0 m-1">
                    Submit
                </Button>
                </Form>
                </div>
                </div>
                </Col>
        </Row>
        </div>

    )
}

export default Login;