import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import axios from "axios";
import {observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";

const MySongEdit = observer((props) => {
    const [name, setName] = useState("")
    const [link, setLink] = useState("")

    const user = props.user
    const genres = props.genres
    const albums = props.albums

    const [selGenre, setSelGenre] = useState([])
    const [selAlbum, setSelAlbum] = useState([])

    const [msg, setMsg] = useState("")
    const [show, setShow] = useState(false);
    let history = useHistory();

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

    async function handleSave(event) {
        event.preventDefault()
        try {
            await axios({
                method: 'POST',
                url: '/songs/create',
                data: {
                    "title": `${name}`,
                    "link": `${link}`,
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
            }).then((e) => {
                if (e.status === 200 || e.status === 201) {
                    axios.get(`${e.headers.location}`)
                        .then(response => {
                            axios({
                                method: 'POST',
                                url: `/performs/song/${response.data.id}/${user.id}`,
                                data: {
                                    "song": {
                                        "id": `${response.data.id}`,
                                        "title": `${name}`,
                                        "link": `${link}`,
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
                                    },
                                    "artist": {
                                        "id": `${user.id}`,
                                        "username": `${user.username}`,
                                        "email": `${user.email}`,
                                        "password": `${user.password}`,
                                        "name": `${user.name}`,
                                        "surname": `${user.surname}`,
                                        "stageName": `${user.stageName}`,
                                        "artist": `${user.artist}`
                                    }
                                }
                        }).then(e => {
                                if(e.status === 200) {
                                    history.push('/')
                                    history.push('/my-songs');
                                }
                                else {
                                    setMsg("Neuspješno dodavanje pjesme.");
                                }
                        })
                    })
                }
            })
        } catch(error) {
            console.log(error);
            setMsg("Neuspješno dodavanje pjesme.");
        }
    }

    return (
        <div>
            <Button variant="primary" size="sm" onClick={handleShow}>Dodaj pjesmu</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj pjesmu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control" name="name" placeholder="Naziv pjesme" id="space"
                           onChange={nameChanged} value={name} required/>
                    <input type="text" className="form-control" name="link" placeholder="Link na pjesmu" id="space"
                           onChange={linkChanged} value={link} />
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
                        Dodaj pjesmu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
})

export default MySongEdit