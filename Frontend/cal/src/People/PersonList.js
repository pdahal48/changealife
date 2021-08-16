import React, { useState, useEffect } from 'react'
import {CalAPI as API} from '../Api'
import PersonListCard from './PersonListCard';

//Controls State for the People list. 
//Each item in the list is sent to PersonCard for render.

const PersonList = () => {
    const [people, setPeople] = useState([])

    useEffect(() => {
        async function getPeople(name) {
            const people = await API.getPeople(name)
            setPeople(people)
            console.log(`printing people in persons list`, people)
        }
        getPeople()
    }, [])

    return (
        <div>
        <div className="col-md-8 offset-md-2 mt-5">
          {people.length
              ? (
                  <div>
                    {people.map(person => (
                        <PersonListCard
                            key={person.id}
                            src={person.src}
                            name={person.fullname}
                            username = {person.username}
                            age={person.age}
                            wishlist={person.wishlist}
                            highlight = {person.highlight}
                            bio = {person.bio}
                            city = {person.city}
                            state = {person.state}
                            shelter = {person.shelter}
                        />
                    ))}
                  </div>
              ) : (
                  <p className="lead">Sorry, no results were found!</p>
              )}
        </div>
        </div>
    );
}


export default PersonList;