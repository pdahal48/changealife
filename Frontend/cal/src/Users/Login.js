import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Login = ({ loginUser }) => {

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
                return console.log(user.errors)
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
        <div className = "container col-md-6 offset-md-4 col-lg-3 offset-lg-4" >
            <div className = "display-4">Login</div>
            <div className = "card my-2">
                <div className = "card-body">
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
        </div>
    )
}

export default Login;