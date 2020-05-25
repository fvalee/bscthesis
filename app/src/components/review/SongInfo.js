import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom'
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "../../forms/Form.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import Reviews from "./Reviews";
import Button from "react-bootstrap/Button";
import {AuthStore} from "../../auth/AuthStore";
import Nav from "react-bootstrap/Nav";

function SongInfo() {
    const {id} = useParams()
    const [song, setSong] = useState([])
    const [artists, setArtists] = useState([])
    const [reviews, setReviews] = useState([])

    const [comment, setComment] = useState("")
    const [mark, setMark] = useState(" ")
    const [msg, setMsg] = useState("")
    const [avg, setAvg] = useState(0)
    const [flag, setFlag] = useState(true);

    let history = useHistory();

    function commentChanged(event) {
        setComment(event.target.value);
    }

    function markChanged(event) {
        setMark(event.target.value);
    }

    async function addReview(event) {
        if(mark === " ") {
            setMsg("Molimo odaberite ocjenu.")
        }
        else {
            event.preventDefault();
            try {
                await axios({
                    method: 'POST',
                    url: `/reviews/${id}/create`,
                    data: {
                        "songId": `${id}`,
                        "mark": Number(mark),
                        "comment": `${comment}`
                    }
                }).then(e => {
                    if(e.status === 200) {
                        history.push('/')
                        history.push(`/songs/${id}`);
                    }
                })
            } catch(error) {
                setMsg("Neuspješno dodavanje osvrta.")
            }
        }
    }

    const goToArtist = (id) => {
        history.push(`/artists/${id}`)
    }

    const goToAlbum = (id) => {
        history.push(`/album/${id}`)
    }

    const goToGenre = (id) => {
        history.push(`/genre/${id}`)
    }

    useEffect( () => {
        axios.get(`/songs/${id}`)
            .then( e => {
                if(e.status === 200) {
                    setSong(e.data)

                }
            })
        axios.get(`/performs/song/${id}`)
            .then(e => {
                setArtists(e.data);
            })
        axios.get(`/reviews/${id}`)
            .then(e => {
                setReviews(e.data);
                let counter = 0;
                let sum = 0;
                e.data.forEach(review => {
                    counter++;
                    sum += review.mark;
                    if(review.user.username === AuthStore.getLoggedIn()) {
                        setFlag(false);
                    }
                });
                if(counter !== 0) {
                    setAvg(Math.round((sum/counter + Number.EPSILON) * 100) / 100)
                }
            })
    }, [id])

    return (
        <Container>
            <br/>
            <h6 className="display-4">{song.length === 0 ? "Pjesma ne postoji." : ""}</h6><p> </p>
            {song.length === 0 ? "" :
                <Row>
                    <Col xl={5}>
                        <Card style={{width: '22em'}}>
                            <Card.Img variant="top"
                                      src={song.album ? (song.album.imageLink === "" ? "/blank.png" : song.album.imageLink) : "/blank.png"}/>
                            <Card.Body>
                                <p className="h4">{song.title}<br/>
                                    {
                                        artists.map((artist, index) =>
                                            <small className="text-muted">
                                                <Nav.Link onClick={() => goToArtist(artist.id)}
                                                          style={{
                                                              margin: 0,
                                                              padding: 0,
                                                              display: 'inline',
                                                              color: "#6c757d"
                                                          }}>
                                                    {index ? ', ' : ' '}{artist.stageName}
                                                </Nav.Link>
                                            </small>
                                        )
                                    }
                                </p>
                                <small>{song.genre ? <Nav.Link onClick={() => goToGenre(song.genre.genreId)} style={{
                                    margin: 0,
                                    padding: 0,
                                    display: 'inline',
                                    color: "#292b2c"
                                }}>{song.genre.genreName}</Nav.Link> : "Nepoznato"} • {' '}
                                    {song.album ? <Nav.Link onClick={() => goToAlbum(song.album.albumId)} style={{
                                        margin: 0,
                                        padding: 0,
                                        display: 'inline',
                                        color: "#292b2c"
                                    }}>{song.album.albumName}</Nav.Link> : "Nepoznati album"}</small>
                            </Card.Body>
                            {song.link ? <div style={{width: 'auto', height: 'auto'}}>
                                <ResponsiveEmbed aspectRatio="16by9">
                                    <embed type="text/html"
                                           src={song.link.length !== 42 && song.link.length !== 43 ?
                                               "https://www.youtube.com/embed/ayf1sYiNLhQ" : song.link.replace("watch?v=", "embed/")}/>
                                </ResponsiveEmbed>
                            </div> : <Card.Footer>Pjesmi nije dodijeljen link.</Card.Footer>}
                        </Card>
                        <br/>
                    </Col>
                    <Col xl={7}>
                        <Card style={{width: '38em'}}>
                            <Card.Header className="h5">Osvrti{" "}
                                <small className="text-muted"><b>{avg}</b>/5</small>
                            </Card.Header>
                            <ListGroup variant="flush">
                                {
                                    reviews.map((review, id) =>
                                        <Reviews key={id} review={review}/>
                                    )
                                }
                            </ListGroup>
                        </Card>
                        <br/>
                        {
                            flag && AuthStore.getLoggedIn() &&
                            <div style={{width: '38em'}}>
                                <h4>Napiši osvrt</h4>
                                <textarea className="form-control" id="space" placeholder="Komentar" name="comment"
                                          onChange={commentChanged} value={comment}/>
                                <span>
                                    <select className="form-control" name="mark" id="space" onChange={markChanged}
                                            value={mark}>
                                        <option selected>Odaberi ocjenu</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                    <div className="text-danger" id="space">{msg}</div>
                                    <Button variant="primary" type="submit" id="space"
                                            onClick={addReview}>Objavi</Button>
                                </span>
                            </div>
                        }
                    </Col>
                </Row>
            }
        </Container>
    );
}

export default SongInfo;