import React, {useEffect, useState} from 'react';
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./MySong.css"
import Nav from "react-bootstrap/Nav";
import {FaMinusCircle} from "react-icons/fa";

function MySong(props) {
    const {id, title, link, album, genre} = props.song;
    const [user, setUser] = useState([]);
    let history = useHistory();

    const albums = props.albums
    const genres = props.genres
    const artists = props.artists

    const [name, setName] = useState(title)
    const [link_, setLink] = useState(link)
    const [selGenre, setSelGenre] = useState([])
    const [selAlbum, setSelAlbum] = useState([])

    const [selArtist, setSelArtist] = useState([]);

    const [msg, setMsg] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setSelGenre({
            "genreName": genres[0].genreName,
            "genreId": genres[0].genreId
        });
        setSelAlbum({
            "albumId": Number(albums[0].albumId),
            "albumName": albums[0].albumName,
            "creatorId": Number(albums[0].creator.id),
            "imageLink": albums[0].imageLink
        });
    }

    const [showArtist, setShowArtist] = useState(false);
    const handleCloseArtist = () => setShowArtist(false);
    const handleShowArtist = () => {
        setShowArtist(true);
        setSelArtist({
            "id": Number(artists[0].id),
            "username": artists[0].username,
            "email": artists[0].email,
            "password": artists[0].password,
            "name": artists[0].name,
            "surname": artists[0].surname,
            "artist": artists[0].isArtist,
            "stageName": artists[0].stageName
        })
    }

    useEffect(() => {
        axios.get(`/performs/song/${id}`)
            .then(response => {
                setUser(response.data);
            })
    }, [id]);

    async function nameChanged(event) {
        setName(event.target.value);
    }

    async function linkChanged(event) {
        setLink(event.target.value);
    }

    function genreChanged(event) {
        let gnr = event.target.value.split(",")
        setSelGenre({
            "genreName": gnr[1],
            "genreId": Number(gnr[0])
        });
    }

    function albumChanged(event) {
        let alb = event.target.value.split(",")
        setSelAlbum({
            "albumId": Number(alb[0]),
            "albumName": alb[1],
            "creatorId": Number(alb[2]),
            "imageLink": alb[3]
        });
    }

    function artistChanged(event) {
        let artist = event.target.value.split(",")
        setSelArtist({
            "id": Number(artist[0]),
            "username": artist[1],
            "email": artist[2],
            "password": artist[3],
            "name": artist[4],
            "surname": artist[5],
            "artist": true,
            "stageName": artist[7]
        })
    }

    function handleDelete() {
        axios.delete(`/songs/${id}`)
            .then((e) => {
                if (e.status === 200) {
                    history.push('/');
                    history.push('/my-songs');
                }
            })
    }

    async function handleSave(event) {
        event.preventDefault()
        try {
            await axios({
                method: 'PUT',
                url: `/songs/${id}`,
                data: {
                    "id": `${id}`,
                    "title": `${name}`,
                    "link": `${link_}`,
                    "album": {
                        "id": `${selAlbum.albumId}`,
                        "albumName": `${selAlbum.albumName}`,
                        "imageLink": `${selAlbum.imageLink}`,
                        "creatorId": `${selAlbum.creatorId}`
                    },
                    "genre": {
                        "id": `${selGenre.genreId}`,
                        "genreName": `${selGenre.genreName}`
                    }
                }
            }).then(e => {
                if(e.status === 200) {
                    history.push('/')
                    history.push('/my-songs');
                }
            }
        )} catch (e) {
            setMsg("Neuspješno uređivanje pjesme.");
        }
    }

    async function deleteArtist(userID) {
        axios.delete(`/performs/song/${id}/${userID}`)
            .then((e) => {
                if (e.status === 200) {
                    history.push('/');
                    history.push('/my-songs');
                }
            })
    }

    async function addArtist(event) {
        event.preventDefault();
        try {
            await axios({
                method: 'POST',
                url: `/performs/song/${id}/${selArtist.id}`,
                data: {
                    "song": {
                        "id": `${id}`,
                        "title": `${name}`,
                        "link": `${link}`,
                        "album": {
                            "id": `${album.albumId}`,
                            "albumName": `${album.albumName}`,
                            "imageLink": `${album.imageLink}`,
                            "creatorId": `${album.creator.id}`
                        },
                        "genre": {
                            "id": `${genre.genreId}`,
                            "genreName": `${genre.genreName}`
                        }
                    },
                    "artist": {
                        "id": `${selArtist.id}`,
                        "username": `${selArtist.username}`,
                        "email": `${selArtist.email}`,
                        "password": `${selArtist.password}`,
                        "name": `${selArtist.name}`,
                        "surname": `${selArtist.surname}`,
                        "artist": true,
                        "stageName": `${selArtist.stageName}`
                    }
                }

            }).then(e => {
                if(e.status === 200) {
                    history.push('/')
                    history.push('/my-songs');
                }
            })
        } catch (e) {
            setMsg("Neuspješno dodavanje izvođača.");
        }
    }

    const goToSong = () => {
        history.push(`/songs/${id}`)
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

    return (
        <ListGroup.Item>
            <Media>
                <Image style={{width: '60px'}} src={album ? (album.imageLink === "" ? "/blank.png": album.imageLink) : "/blank.png"} rounded/>
                <Media.Body style={{marginLeft: '15px'}}>
                    <h5 style={{margin: 0, padding: 0}}>
                        <Nav.Link onClick={goToSong} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{title}</Nav.Link>{" "}
                        {
                            user.map((user, id) =>
                                <span id="artist">
                                    <br/>
                                    <small className="text-muted" key={id}>
                                        <Nav.Link onClick={() => goToArtist(user.id)} style={{margin: 0, padding: 0, display: 'inline', color: "#6c757d"}}>{user.stageName}</Nav.Link>
                                    </small>{" "}
                                    {user.id !== album.creator.id && <small><FaMinusCircle style={{color: "#dc3545"}} id="button" onClick={() => deleteArtist(user.id)}/></small>}
                                </span>
                            )
                        }
                        <br/>
                    </h5>
                    <small>{genre ? <Nav.Link onClick={() => goToGenre(genre.genreId)} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{genre.genreName}</Nav.Link> : "Nepoznato"} • {' '}
                        {album ? <Nav.Link onClick={() => goToAlbum(album.albumId)} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{album.albumName}</Nav.Link> : "Nepoznati album"}</small><br/>
                    <Button className="badge badge-pill badge-secondary" variant="secondary" onClick={handleShowArtist}>Dodaj izvođača</Button>{' '}
                    <Button className="badge badge-pill badge-warning" variant="warning" onClick={handleShow}>Uredi</Button>{' '}
                    <Button className="badge badge-pill badge-danger" variant="danger" onClick={handleDelete}>Obriši</Button>
                </Media.Body>
            </Media>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Uredi pjesmu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control" name="name" placeholder="Naziv pjesme" id="space"
                           onChange={nameChanged} value={name} required/>
                    <input type="text" className="form-control" name="link" placeholder="Link na pjesmu" id="space"
                           onChange={linkChanged} value={link_} />
                    <select className="form-control" name="genre" id="space" onChange={genreChanged}>
                        {genres.map(genre =>
                            <option key={genre.id} value={[genre.genreId,genre.genreName]}>{genre.genreName}</option>
                        )}
                    </select>
                    <select className="form-control" name="album" id="space" onChange={albumChanged}>
                        {albums.map(album =>
                            <option key={album.albumId} value={[album.albumId,album.albumName,album.creator.id,album.imageLink]}>{album.albumName}</option>
                        )}
                    </select>
                    <div className="text-danger">{msg}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Odustani
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Spremi promjene
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showArtist} onHide={handleCloseArtist}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj izvođača</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select className="form-control" name="genre" id="space" onChange={artistChanged}>
                        {artists.map(artist =>
                            <option key={artist.id} value={[artist.id,artist.username,artist.email,artist.password,artist.name,artist.surname,artist.isArtist,artist.stageName]}>{artist.stageName}</option>
                        )}
                    </select>
                    <div className="text-danger">{msg}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseArtist}>
                        Odustani
                    </Button>
                    <Button variant="primary" onClick={addArtist}>
                        Dodaj izvođača
                    </Button>
                </Modal.Footer>
            </Modal>
        </ListGroup.Item>
    )
}

export default MySong;