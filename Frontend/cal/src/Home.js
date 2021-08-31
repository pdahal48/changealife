import React, {useState, useEffect} from "react";
import { Row, Col, Carousel } from 'react-bootstrap';
import SuccessStories from "./SuccessStories";
import {CalAPI as API} from './Api';
import LoadingSpinner from './LoadingSpinner'
import '../src/Home.css'

const Home = () => {
  const [people, setPeople] = useState([])
  const [stories, setStories] = useState([])

  useEffect(() => {
      async function getPeople(name) {
          const people = await API.getPeople(name)
          setPeople(people)
      }
      getPeople()
  }, [])

  useEffect(() => {
    async function getStories() {
        const stories = await API.getStories()
        setStories(stories)
    }
    getStories()
}, [])

  return (
    <div className="container-fluid home-body">
      {people.length ?
      <div>
      <Row >
        <Col>
          <div className="home-img">
            <div className="col-12 display-3 carousel-slogan">
              <div>
                DONATE TODAY.
              </div>
              <div>
                BUILD YOUR COMMUNITY!
              </div>
            </div>
            <Carousel className="container-fluid home-carousel">
              <Carousel.Item>
                <a href = {`/users/${people[people.length-1].username}`}>
                <div className="container">
                <img
                  className="d-block w-100"
                  src={people[people.length-1].src}
                  alt={people[people.length-1].fullName}
                />
                </div>
                
                </a>
                
                <Carousel.Caption>
                  <h5 className="carousel-head">{people[people.length-1].fullName}</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
              <a href = {`/users/${people[people.length-2].username}`}>
                <img
                  className="d-block w-100"
                  src={people[people.length-2].src}
                  alt="Second slide"
                />
                </a>
                <Carousel.Caption>
                  <h5 className="carousel-head">{people[people.length-2].name}</h5>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
              <a href = {`/users/${people[people.length-3].username}`}>
                <img
                  className="d-block w-100"
                  src={people[people.length-3].src}
                  alt="Third slide"
                />
                </a>
                <Carousel.Caption>
                <h5 className="carousel-head">{people[people.length-3].name}</h5>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>
      </Row>
      <h2 className="text-center display-3 mt-4">Success Stories</h2>
      {
        stories.map(story => (
          <SuccessStories
            key={story.id}
            src={story.src}
            story={story.story}
          />
        ))
      }
      </div>
    : <LoadingSpinner />
      }
    </div>
  )
}

export default Home;