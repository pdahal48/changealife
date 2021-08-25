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
    <div>
      {people.length ?
      <div>
      <Row>
        <Col>
          <div className="home-img">
            <div className="carousel-slogan">
              <h3 className="display-3">
                DONATE TODAY. <br></br>
                BUILD YOUR COMMUNITY!
              </h3>
            </div>
            <Carousel className="container-fluid mt-2 home-carousel">
              <Carousel.Item className="min-vh-100">
                <a href = {`/users/${people[people.length-1].username}`}>
                <img
                  className="d-block w-100"
                  src={people[people.length-1].src}
                  alt="Jerry Shultz"
                />
                </a>
                
                <Carousel.Caption>
                  <h5 className="carousel-head">Jerry Shultz</h5>
                  <p className="carousel-text">Jerry needs help with applying for public benefits</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
              <a href = {`/users/${people[people.length-2].username}`}>
                <img
                  className="img-fluid d-block w-100"
                  src={people[people.length-2].src}
                  alt="Second slide"
                />
                </a>
                <Carousel.Caption>
                  <h5 className="carousel-head">Terry wol</h5>
                  <p className="carousel-text">Terry is in need of some cash at the moment</p>
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
                  <h5 className="carousel-head text-warning">Steven schultz</h5>
                  <p className="carousel-text">Steven needs some warm coat</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>
      </Row>
      <h2 className="text-center display-4 mt-4">Success Stories</h2>
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