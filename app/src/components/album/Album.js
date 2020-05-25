import React, {useEffect, useState} from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import '../../forms/Form.css'
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Accordion from 'react-bootstrap/Accordion'
import Nav from "react-bootstrap/Nav";
import {useHistory} from "react-router-dom";

function Album(props) {
    const {albumId, albumName, imageLink, creator} = props.album;
    const [song, setSong] = useState([]);
    let history = useHistory();

    useEffect(() => {
        axios.get(`/songs/onAlbum/${albumId}`)
            .then(response => {
                setSong(response.data);
            })
    }, [albumId]);

    const goToSong = (id) => {
        history.push(`/songs/${id}`)
    }

    const goToArtist = (id) => {
        history.push(`/artists/${id}`)
    }

    const goToAlbum = (id) => {
        history.push(`/album/${id}`)
    }

    return (
        <Card style={{ width: '16rem' }}>
            <Card.Img variant="top" src={imageLink === "" ? "/blank.png": imageLink} />
            <Card.Body className="h4"><Nav.Link onClick={() => goToAlbum(albumId)} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{albumName}</Nav.Link><br/>
                <small className="text-muted">
                    <Nav.Link onClick={() => goToArtist(creator.id)} style={{margin: 0, padding: 0, display: 'inline', color: "#6c757d"}}>{creator.stageName}</Nav.Link>
                </small>
            </Card.Body>
            <Accordion>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    <small>Pjesme na albumu</small>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <ListGroup className="list-group-flush">
                        {
                            song.map(song =>
                                <ListGroupItem key={song.id}>
                                    <Nav.Link onClick={() => goToSong(song.id)} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{song.title}</Nav.Link>
                                </ListGroupItem>
                            )
                        }

                    </ListGroup>
                </Accordion.Collapse>
            </Accordion>

        </Card>
    );
}

export default Album;