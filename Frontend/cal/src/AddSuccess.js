import React, { useState, useContext } from 'react'
import { Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import UserContext from './Users/UserContext';

const AddSuccess = ({addStory}) => {

    const { currentUser } = useContext(UserContext);
    const history = useHistory()

    const [flag, setFlag] = useState(false)
    const [value, setValue] = useState([null])

    const [formdata, setFormData] = useState({
        src: "",
        story: "",
        user_username: currentUser.username
    });

    async function handleSubmit(e) {

        e.preventDefault()

        //selecting the image
        let imageField = document.querySelector('#user-image')
        const imageFile = imageField.files[0]
        
        //getting the secure url
        //Because I am making a request to a different server, this might cause some problems when uploaded to heroku
        const { url } = await API.getUrl()

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
        let story = await addStory({...formdata, src:imageUrl})

        if(story.success){
            history.push("/");
        } else {
            setFlag(true)
            setValue(story.errors[0])
        }
    } catch(e){
        alert(e)
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
        <div className="container mb-5 mt-3">
            <Row className="justify-content-center">
            <Col className="col-7">
            { flag && 
            <Alert variant="warning">{value}</Alert>
            }
            </Col>
            </Row>

            <Form className="addSuccess_container container">
            <Row className="justify-content-center">
                <Col className="add_success col-7">
                    <div className="form-group mt-3 mb-5">
                        <label>Image</label>
                        <input
                            id= "user-image"
                            type="file"
                            name="src"
                            className="form-control mb-3"
                            accept=".jpeg, .png, .jpg"
                            value={formdata.image}
                            onChange={handleChange}
                        />
                        <label>Share your story</label>
                        <input
                            style={{ height: '100px' }}
                            type="text"
                            name="story"
                            placeholder="Explain your success story in depth"
                            className="form-control"
                            value={formdata.story}
                            onChange={handleChange}
                        />
                        <Button
                            variant="primary" 
                            type="submit" 
                            className = "position-absolute end-50"
                            onClick = {handleSubmit}
                            >
                            Submit
                        </Button>
                    </div>
                </Col>
            </Row>

            </Form>
        </div>
    )
}

export default AddSuccess;