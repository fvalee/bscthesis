import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import {AuthStore} from "../../auth/AuthStore";
import { useHistory } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import axios from "axios";
import "../song/MySong.css"

function Reviews(props) {
    const {song, user, mark, comment, posted} = props.review
    let history = useHistory();
    let time = new Date(posted).toLocaleDateString() + ' ' + new Date(posted).toLocaleTimeString();

    async function deleteReview() {
        axios.delete(`/reviews/${song.id}/delete`)
            .then((e) => {
                if (e.status === 200) {
                    history.push('/');
                    history.push(`/songs/${song.id}`);
                }
            })
    }

    if(user.username === AuthStore.getLoggedIn()) {
        return(
            <div className="list-group-item list-group-item-info" id="artist">
                {comment ? <span>{comment}<br/></span> : <span> </span>}
                <small className="text-muted">{user.username} | <strong>{mark}</strong> | {time} {' '}
                    <FaTrash className="far" style={{color: "#dc3545"}} regular id="button" onClick={() => deleteReview()}/>
                </small>
            </div>
        )
    }
    else return(
        <ListGroup.Item>
            {comment ? <span>{comment}<br/></span> : <span> </span>}
            <small className="text-muted">{user.username} | <strong>{mark}</strong> | {time}</small>
        </ListGroup.Item>
    )
}

export default Reviews