import React, {useEffect, useState} from 'react';
import Media from "react-bootstrap/Media";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory } from 'react-router-dom'
import Nav from "react-bootstrap/Nav";

function SongOnAlbum(props) {
    const {id, title, genre} = props.song;
    const [user, setUser] = useState([]);
    let history = useHistory();

    const goToSong = () => {
        history.push(`/songs/${id}`)
    }

    const goToArtist = (id) => {
        history.push(`/artists/${id}`)
    }

    const goToGenre = (id) => {
        history.push(`/genre/${id}`)
    }

    useEffect(() => {
        axios.get(`/performs/song/${id}`)
            .then(response => {
                setUser(response.data);
            })
    }, [id]);

    return (
        <ListGroup.Item>
            <Media>
                <Media.Body>
                    <h5 style={{margin: 0, padding: 0}}>
                        <Nav.Link onClick={goToSong} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{title}</Nav.Link>{" "}
                        {
                            user.map((user, index) =>
                                <small className="text-muted" key={index}>{index ? ', ' : ' '}
                                    <Nav.Link onClick={() => goToArtist(user.id)} style={{margin: 0, padding: 0, display: 'inline', color: "#6c757d"}}>{user.stageName}</Nav.Link>
                                </small>
                            )
                        }
                        <br/>
                    </h5>
                    <small>{genre ? <Nav.Link onClick={() => goToGenre(genre.genreId)} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{genre.genreName}</Nav.Link> : "Nepoznato"}</small>
                </Media.Body>
            </Media>
        </ListGroup.Item>
    )
}

export default SongOnAlbum;