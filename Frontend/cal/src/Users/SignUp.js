import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router'
import {CalAPI as API} from '../Api'


const SignUp = ({ signup }) => {

    const [shelters, setShelters] = useState([])
    const [flag, setFlag] = useState(false)
    const [value, setValue] = useState([null])
    const history = useHistory();

    const [formdata, setFormData] = useState({
        username: "",
        fullName: "",
        age: "",
        city: "",
        state: "",
        highlight: "",
        bio: "",
        image: "",
        phone: "",
        email: "",
        shelter: "",
        password: ""
    });

    useEffect(()=> {
        async function getShelters() {
            const shelters = await API.getShelters()
            setShelters(shelters)
        }
        getShelters();
    }, [])

    async function handleSubmit(e) {
            e.preventDefault()

            //selecting the image
            let imageField = document.querySelector('#user-image')
            const imageFile = imageField.files[0]
            
            //getting the secure url
            //Because I am making a request to a different server, this might cause some problems when uploaded to heroku
            const { url } = await fetch('http://localhost:3001/users/s3Url')
                            .then(res => res.json())
    
            // post the image direclty to the s3 bucket
            await fetch(url, {
                method: "PUT",
                headers: {      
                "Content-Type": "multipart/form-data"
                },
                body: imageFile
            })
            const imageUrl = url.split('?')[0]
            
            try {
            let user = await signup({...formdata, image:imageUrl})
            if(user.success){
                console.log(`Success`)
                // history.push("/shelters");
                console.log(user)
            } else {
                setFlag(true)
                setValue(user[0].split(".").pop())
            }
        } catch(e){
            // console.log(`pringting errrors `, e.data.error.message)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <div className="container col-md-6 col-lg-5 offset-md-3 offset-lg-3">
        { flag && 
            <Alert variant="warning">{value}</Alert>
        }
          <h3>Sign Up</h3>
          <div className="card">
            <div className="card-body">
              <form>
                    <Row>
                      <Col>
                      <div className="form-group mb-2">
                            <label>Username</label>
                            <input className="form-control-plaintext"
                                name="username"
                                className="form-control"
                                value={formdata.username}
                                onChange={handleChange}
                            />
                        </div>
                      </Col>
                      </Row>
                    <Row>
                      <Col>
                      <div className="form-group mb-2">
                            <label>Full name</label>
                            <input
                                name="fullName"
                                className="form-control"
                                value={formdata.fullName}
                                onChange={handleChange}
                            />
                        </div>
                      </Col>
                      <Col>
                      <div className="form-group mb-2">
                            <label>Age</label>
                            <input
                                name="age"
                                className="form-control"
                                value={formdata.age}
                                onChange={handleChange}
                            />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className="form-group mb-2">
                                <label>City</label>
                                <input
                                    name="city"
                                    className="form-control"
                                    value={formdata.city}
                                    onChange={handleChange}
                                />
                            </div>
                        </Col>
                        <Col>
                        <div className="form-group mb-2">
                                <label>State</label>
                                <input
                                    name="state"
                                    className="form-control"
                                    value={formdata.state}
                                    onChange={handleChange}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-6">
                            <div className="form-group mb-2">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formdata.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </Col>
                        </Row>
                        <Row>
                        <Col className="col-6">
                            <div className="form-group mb-2">
                                <label>Email</label>
                                <input
                                    name="email"
                                    className="form-control"
                                    value={formdata.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-group">
                             <label>Shelter</label>
                                <Form.Select className="my-2" value={formdata.shelter} onChange={handleChange} name="shelter">
                                <option key={'selectoptions'}>Select your shelter</option>
                                    {shelters.map(shelter => (
                                        <option
                                            key={shelter.name}
                                        >{shelter.name}</option>
                                    ))}
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-group my-2">
                                <label>Image</label>
                                <input
                                    id= "user-image"
                                    type="file"
                                    name="image"
                                    className="form-control"
                                    accept=".jpeg, .png, .jpg"
                                    value={formdata.image}
                                    onChange={handleChange}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className="form-group my-2">
                                <label>Mini biography</label>
                                <input
                                    style={{ height: '100px' }}
                                    type="text"
                                    name="bio"
                                    placeholder="Explain your situation in depth"
                                    className="form-control"
                                    value={formdata.bio}
                                    onChange={handleChange}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className="form-group my-2">
                                <label>Highlight</label>
                                <input
                                    style={{ height: '100px' }}
                                    type="text"
                                    name="highlight"
                                    placeholder="Explain your situation in a few sentences"
                                    className="form-control"
                                    value={formdata.highlight}
                                    onChange={handleChange}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className="form-group mb-5">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formdata.password}
                                onChange={handleChange}
                            />
                        </div>
                        </Col>
                    </Row>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        className = "position-absolute bottom-0 end-0 m-2"
                        onClick = {handleSubmit}
                        >
                        Submit
                    </Button>
              </form>
            </div>
          </div>
        </div>
    );
}


export default SignUp;