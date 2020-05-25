import React, {useEffect, useState} from 'react';
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import {useParams} from 'react-router-dom'
import SongsByGenre from "./SongsByGenre";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function GenreInfo() {
    const {id} = useParams()
    const [genre, setGenre] = useState([])
    const [songs, setSongs] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchString, setSearchString] = useState("")

    useEffect(() => {
        axios.get(`/genres/${id}`)
            .then(e => {
                setGenre(e.data)
                return axios.get(`/songs/byGenre/${id}`)
            }).then(e => {
                setSongs(e.data)
                setFiltered(e.data)
        })
    }, [id])

    function search(e) {
        e.preventDefault()
        setSongs(filtered)
        setSongs(filtered.filter(song => song.title.toLowerCase().match(searchString.toLowerCase())))
    }

    let noSongs
    if(songs.length === 0)
        noSongs = "Nema pjesama navedenog žanra."
    else noSongs = ""

    return(
        <div className="container" style={{display: "inline"}}>
            <br/>
            <h6 className="display-4">
                {genre.length === 0 ? "Žanr ne postoji u sustavu." :
                    <div> {genre.genreName}
                        <Form inline style={{float:'right', display:'block'}} onSubmit={search}>
                        <FormControl type="text" placeholder="Traži pjesmu" className="mr-sm-2" onChange={e => setSearchString(e.target.value)} value={searchString}/>
                        <Button variant="outline-success" type="submit">Traži</Button>
                        </Form>
                    </div>
                }
            </h6><p> </p>
            {
                genre.length === 0 ? "" :
                    <ListGroup>
                        {
                            songs.map(song =>
                                <SongsByGenre key={song.id} song={song}/>
                            )
                        }
                        {noSongs}
                    </ListGroup>
            }
        </div>
    )
}

export default GenreInfo