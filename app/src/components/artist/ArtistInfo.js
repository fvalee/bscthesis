import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom'
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import "../../forms/Form.css"
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Media from "react-bootstrap/Media";
import Nav from "react-bootstrap/Nav";
import Concerts from "./Concerts";

function ArtistInfo() {
    const {id} = useParams()
    const [songs, setSongs] = useState([])
    const [artist, setArtist] = useState([])
    const [concerts, setConcerts] = useState([])
    let history = useHistory();

    useEffect( () => {
        axios.get(`/performs/artist/${id}`)
            .then(e => {
                setSongs(e.data);
            })
        axios.get(`/users/find/${id}`)
            .then(e => {
                setArtist(e.data);
                return axios.get(`/concerts/${e.data.id}`)
            }).then(response => {
                setConcerts(response.data);
            });
    }, [id])

    const goToSong = (id) => {
        history.push(`/songs/${id}`)
    }

    const goToAlbum = (id) => {
        history.push(`/album/${id}`)
    }

    const goToGenre = (id) => {
        history.push(`/genre/${id}`)
    }

    return (
        <Container>
            <br/>
            <h6 className="display-4">{artist.artist ? artist.stageName : "Izvođač ne postoji."}</h6><p> </p>
            {artist.artist ?
                <div>
                    <h6>Sve pjesme izvođača</h6>
                    <ListGroup>
                    {
                        songs.map((song) =>
                            <ListGroup.Item>
                                <Media>
                                    <Image style={{width: '60px'}} src={song.song.album ? (song.song.album.imageLink === "" ? "/blank.png": song.song.album.imageLink) : "/blank.png"} rounded/>
                                    <Media.Body style={{marginLeft: '15px', marginTop: '5px'}}>
                                        <h5 style={{margin: 0, padding: 0}}>
                                            <Nav.Link onClick={() => goToSong(song.song.id)} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{song.song.title}</Nav.Link>{" "}
                                        </h5>
                                        <small>{song.song.genre ? <Nav.Link onClick={() => goToGenre(song.song.genre.genreId)} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{song.song.genre.genreName}</Nav.Link> : "Nepoznato"} • {' '}
                                        {song.song.album ? <Nav.Link onClick={() => goToAlbum(song.song.album.albumId)} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{song.song.album.albumName}</Nav.Link> : "Nepoznati album"}</small><br/>
                                    </Media.Body>
                                </Media>
                            </ListGroup.Item>
                        )
                    }
                    </ListGroup>
                    <p> </p>
                    <h6>Koncerti izvođača</h6>
                    <ListGroup>
                        {
                            concerts.length === 0 ?
                                <h5 style={{margin: 0, padding: 0}} className="text-muted">Izvođač nema koncerata.</h5> :
                                concerts.map((concert, id) => <Concerts key={id} concert={concert}/>
                            )
                        }
                    </ListGroup>
                </div> : ""}
        </Container>
    );
}

export default ArtistInfo;