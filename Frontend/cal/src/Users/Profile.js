import { useState, useContext, useEffect} from 'react'
import {CalAPI as API} from '../Api'
import UserContext from './UserContext'
import { Form, Button, Row, Col } from 'react-bootstrap'

const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [shelters, setShelters] = useState([])
    
    useEffect(()=> {
        async function getShelters() {
            const shelter = await API.getShelters()
            setShelters(shelter)
        }
        getShelters();
    }, [currentUser])

    const [formdata, setFormData] = useState({
        username: currentUser.username,
        fullname: currentUser.fullname,
        age: currentUser.age,
        city: currentUser.city,
        state: currentUser.state,
        phone: currentUser.phone,
        email: currentUser.email,
        shelter: currentUser.shelter,
        bio: currentUser.bio,
        highlight: currentUser.highlight,
        password: ""
    });

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('submitted')

        let profileData = {
            username: formdata.username,
            fullname: formdata.fullname,
            age: formdata.age,
            city: formdata.city,
            state: formdata.state,
            phone: formdata.phone,
            email: formdata.email,
            shelter: formdata.shelter,
            bio: formdata.bio,
            highlight: formdata.highlight,
            password: formdata.password,
        };

        let username = formdata.username;
        let updatedUser;

        try {
            console.log(`trying to update`)
            updatedUser = await API.saveProfile(username, profileData);
          } catch (errors) {
            setFormData(errors);
            return;
        }
        setFormData(f => ({ ...f, password: "" }));
        setCurrentUser(updatedUser);
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleChangeCheckbox = (e) => {
        const {name, checked} = e.target
        setFormData(data => ({
            ...data,
            [name]: checked
        }))
    }

    return (
        <div className="col-md-6 col-lg-7 offset-md-3 offset-lg-3">
          <h3>Profile</h3>
          <div className="card">
            <div className="card-body">
              <form>
                    <Row>
                      <Col>
                      <div className="form-group mb-2">
                            <label>Username</label>
                            <p className="form-control-plaintext">{formdata.username}</p>
                        </div>
                      </Col>
                      </Row>
                    <Row>
                      <Col>
                      <div className="form-group mb-2">
                            <label>Full name</label>
                            <input
                                name="fullname"
                                className="form-control"
                                value={formdata.fullname}
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
                            <label>Confirm password to make changes:</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password to confirm changes"
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
                        onClick={handleSubmit}
                        >
                        Submit
                    </Button>
              </form>
            </div>
          </div>
        </div>
    );
}

export default Profile;