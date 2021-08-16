import React from "react";
import { Carousel } from 'react-bootstrap';
import PersonList from "./People/PersonList";
import '../src/Home.css'

const Home = () => {

    return (
        <div className="home-img">
          <div className="carousel-slogan">
            <h3 className="display-3">
                DONATE TODAY. <br></br>
                BUILD YOUR COMMUNITY!
              </h3>
          </div>
        <Carousel className = "container-fluid mt-2 home-carousel">
        <Carousel.Item className = "min-vh-100">
          <img
            className="d-block w-100"
            src="https://ca-times.brightspotcdn.com/dims4/default/21e8c30/2147483647/strip/true/crop/2048x1152+0+0/resize/840x473!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F9c%2F6d%2Fff840e481091b821f472070a85ab%2Fla-1519931859-72n1qtn38y-snap-image"
            alt="Jerry Shultz"
          />
          <Carousel.Caption>
            <h5 className="carousel-head">Jerry Shultz</h5>
            <p className="carousel-text">Jerry recently rented an apartment and is out of homeless shelter now</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media2.s-nbcnews.com/i/newscms/2016_11/1465656/160320-marvin-bolton-homeless-nyc-1031a_f41d04ecc91aac27a5af090670eb7bd0.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5 className="carousel-head">Terry wol</h5>
            <p className="carousel-text">Terry found a place to stay for a month</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://voa-production.s3.amazonaws.com/dragonfly-uploads/2018/02/15/15/34/43/aa1db1c7-e7f5-47dc-b87b-93016a25ffa6/hero-640-homeless-people.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5 className="carousel-head text-warning">Steven schultz</h5>
            <p className="carousel-text">Steven made enough from donations to start living on his own</p>
          </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
        
        <div className="mt-4">
            <PersonList />
        </div>
        
        </div>
    )
}

export default Home;
