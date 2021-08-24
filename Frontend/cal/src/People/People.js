import React, { useState, useEffect } from 'react'
import {CalAPI as API} from '../Api'
import PersonCard from './PersonCard';
import SearchForm from '../SearchForm';

//Controls State for the People list. 
//Each item in the list is sent to PersonCard for render for /users page

const People = () => {
    const [people, setPeople] = useState([])

    useEffect(() => {
        async function getPeople(name) {
            const people = await API.getPeople(name)
            setPeople(people)
            console.log(`Printing people in People page `, people)
        }
        getPeople()
    }, [])

    /** Triggered by search form submit; reloads companies. */
    async function search(name) {
        let people = await API.getPeople(name);
        setPeople(people);
    }

    return (
        <div className="container">
        <SearchForm searchFor ={search} />
          {people.length
              ? (
                  <div>
                      {console.log(people)}
                    {people.map(person => (
                        <PersonCard
                            key={person.id}
                            src={person.src}
                            fullname={person.fullname}
                            username = {person.username}
                            age={person.age}
                            highlight = {person.highlight}
                        />
                    ))}
                  </div>
              ) : (
                  <p className="lead">Sorry, no results were found!</p>
              )}
        </div>
    );
}


export default People;