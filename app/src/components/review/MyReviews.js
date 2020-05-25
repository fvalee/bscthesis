import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import { useHistory } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import axios from "axios";
import "../song/MySong.css"
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";

function MyReviews(props) {
    const {song, mark, comment, posted} = props.review
    let history = useHistory();
    let time = new Date(posted).toLocaleDateString() + ' ' + new Date(posted).toLocaleTimeString();

    const goToSong = () => {
        history.push(`/songs/${song.id}`)
    }

    function deleteReview() {
        axios.delete(`/reviews/${song.id}/delete`)
            .then((e) => {
                if (e.status === 200) {
                    history.push('/');
                    history.push(`/my-reviews`);
                }
            })
    }

    return(
        <ListGroup.Item>
            <div id="artist">
            <Media>
                <Image style={{width: '60px'}} src={song.album.imageLink ? (song.album.imageLink === "" ? "blank.png": song.album.imageLink) : "blank.png"} rounded/>
                <Media.Body style={{marginLeft: '15px', marginTop: '5px'}}>
                    <h5 style={{margin: 0, padding: 0}}>
                        <Nav.Link onClick={goToSong} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{song.title}</Nav.Link>{" "}<br/>
                    </h5>
                    {comment ? <span>{comment}<br/></span> : <span><i>Komentar nije ostavljen.</i><br/></span>}
                    <small className="text-muted"><strong>{mark}</strong> | {time} {' '}
                        <FaTrash className="far" style={{color: "#dc3545"}} regular id="button" onClick={() => deleteReview()}/>
                    </small>
                </Media.Body>
            </Media>
            </div>
        </ListGroup.Item>
    )
}

export default MyReviews