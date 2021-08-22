import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {CalAPI as API} from '../Api'
import { Card, ListGroup, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import {loadStripe} from '@stripe/stripe-js';
import Paypal from '../Paypal';
import WishListItem from '../WishListItem';
import UserContext from "../Users/UserContext";
import Profile from '../Users/Profile'
import '../CardInput.css'

const UserInfo = () => {
    const { username } = useParams()
    const [UserInfo, setUserInfo] = useState([])
    const [wishList, setWishList] = useState([])
    const [shelter, setShelter] = useState([])
    const [image, setImage] = useState([])
    const [show, setShow] = useState(false);
    const { currentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        amount: "",
        wish: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    async function handleAdd() {
        const result = await API.add({user_username: username, wish: formData.wish})
        console.log(result)
        setWishList([...wishList, result.wish])
        setFormData({ wish: ""})
        console.log(wishList)
    }

    async function handleRemove(id) {
        if (id !== undefined) {
            const result = await API.remove(id)
            setWishList(wishList.filter((wish) => wish.id !== id))
        }
        setWishList(wishList.filter((wish) => wish.id !== id))
    }

    //functions for paypal modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //stripe publish key
    const stripePromise = loadStripe(process.env.REACT_APP_KEY);

    useEffect(() => {
        async function getUserInfo() {
            const result = await API.get(username)
            setUserInfo(result)
            setWishList(result.wish)
            setShelter(result.shelter)
            setImage(result.image)
        }
        getUserInfo()
    }, [username])

    return (
        <div className="container-fluid mb-3">
        <Row className="justify-content-center mt-3">
        {UserInfo.wish &&
            <Col className="col-5">
            <Card style={{ width: '100%'}} >
            <Card.Img variant="top" src={ image } />
            <Card.Body>
            <Card.Text>
                <b>Name: </b>{UserInfo.fullname} <br></br>
                <b>Age: </b>{UserInfo.age} <br></br>
                <b>City: </b> {UserInfo.city}<br></br>
                <b>State: </b>{UserInfo.state}<br></br>
            </Card.Text>
            <Card.Text className = "text-left">
                {UserInfo.bio}
            </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ul >
                Currently, I am in need of:
                {wishList.length
                    ? (
                        <div>
                            {wishList.map(item => (
                                <WishListItem
                                    key= {item.id}
                                    id = {item.id}
                                    wish = {item.wish}
                                    handleRemove = {handleRemove}
                                />
                            ))}
                        </div>
                    ) :
                    <div>
                    </div>
                }
                {(currentUser !== null) &&
                (currentUser.username === username) &&
                    <Row>
                        <Col className="col-4 p-0">
                        <Form className="mt-2">
                        <Form.Group>
                            <Col >
                                <Form.Control
                                    name="wish"
                                    type="string"
                                    placeholder="Add to your wish"
                                    value={formData.wish}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        </Form>
                        </Col>
                        <Col>
                            <Button className="add-btn btn btn-primary mt-2" onClick={handleAdd}>Add</Button>
                        </Col>
                    </Row>
                }
            </ul>
            </ListGroup>
            </Card>
            </Col>
        }

        <Col className="col-5">
        {(currentUser !== null) &&
          (currentUser.username === username) ?
          <div className='col-9'>
            <Profile /> 
          </div>
           :
        <div className="col-5">
                <h3>Ways to help:</h3>
                <div>
                    <div>
                        <h5>If you want to buy an item from the wishlist. Ship them to the shelter located at:</h5>
                    <div className="mt-1 mb-4">
                        <b>Name: </b>{shelter.name} <br></br>
                        <b>St. Adress: </b>{shelter.address} <br></br>
                        <b>City: </b>{shelter.city} <br></br>
                        <b>State: </b>{shelter.state} <br></br>
                        <b>Zip: </b>{shelter.zip}
                    </div>
                    </div>
                    <h5>Donate using Paypal</h5>
                    <div className="mb-2">
                        Donations via paypal are sent to receivers instantly. Please verify the name of the person
                        you are donating to and set the amount before clicking the donate button.
                    </div>
                    <div>
                        Donating to: <b>{UserInfo.fullname}</b>
                    </div>
                    <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Amount: 
                        </Form.Label>
                        <Col sm="5">
                            <Form.Control
                                name="amount"
                                type="number"
                                placeholder="Donation amount"
                                onChange={handleChange}
                            />
                    <Button className = "btn-warning donate-btn" onClick={handleShow}>
                        Donate now
                    </Button>
                        </Col>
                    </Form.Group>
                    </Form>
                    <Modal show={show} onHide={handleClose} className = "mt-2 pt-5">                        
                        <Paypal amount = {formData.amount} email={UserInfo.email}/>
                    </Modal>
                </div>
        </div>
    }
        </Col>
        </Row>
        </div>
    )
}

export default UserInfo;