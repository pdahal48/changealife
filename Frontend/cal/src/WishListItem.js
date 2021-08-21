import React, {useContext} from 'react'
import { Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import UserContext from "./Users/UserContext";
import {useParams} from 'react-router-dom'

const element = <FontAwesomeIcon icon={faTrash}/>


const WishListItem = ({id, wish, handleRemove}) => {
    const { currentUser } = useContext(UserContext);
    const { username } = useParams()

    return (
        <ul>
            <li key={id} data-id={id}>
                {wish}
                {(currentUser !== null) && 
                (username === currentUser.username) &&
                    <Button className="todoButton mt-0 btn-light p-0" onClick={ () => handleRemove(id)}>{element}</Button>
            }
            </li>
        </ul>
    )
}

export default WishListItem;