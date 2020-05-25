import React, {useEffect, useState} from 'react';
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import {useParams} from 'react-router-dom'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import SongOnAlbum from "./SongOnAlbum";

function AlbumInfo() {
    const {id} = useParams()
    const [album, setAlbum] = useState([])
    const [songs, setSongs] = useState([])

    useEffect(() => {
        axios.get(`/albums/${id}`)
            .then(e => {
                setAlbum(e.data)
            })
        axios.get(`/songs/onAlbum/${id}`)
            .then(response => {
                setSongs(response.data);
            })
    }, [id])

    let noSongs
    if(songs.length === 0)
        noSongs = "Nema pjesama na albumu."
    else noSongs = ""

    return(
        <div className="container" style={{display: "inline"}}>
            <br/>
            <h6 className="display-4">{album.length === 0 ? "Album ne postoji." : album.albumName}</h6><p> </p>
            {
                album.length === 0 ? "" :
                    <Row>
                        <Col xs={3}>
                            <Image src={album.imageLink === "" ? "/blank.png" : album.imageLink} rounded fluid/>
                        </Col>
                        <Col xs={9}>
                            <ListGroup>
                                {
                                    songs.map(song =>
                                        <SongOnAlbum key={song.id} song={song}/>
                                    )
                                }
                            </ListGroup>
                            {noSongs}
                        </Col>
                    </Row>
            }
        </div>
    )
}

export default AlbumInfo