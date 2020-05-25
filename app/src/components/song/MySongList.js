import React, {useEffect, useState} from 'react'
import MySong from "./MySong";
import MySongEdit from "./MySongEdit";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function MySongList() {
    const [songs, setSongs] = useState([])
    const [user, setUser] = useState([])
    const [albums, setAlbums] = useState([])
    const [genres, setGenres] = useState([])
    const [artists, setArtists] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchString, setSearchString] = useState("")

    useEffect(() => {
        axios.get(`/users/${localStorage.getItem('username')}`)
            .then(response => {
                setUser(response.data);
                axios.get(`/songs/my/${response.data.id}`)
                    .then(response => {
                    setSongs(response.data);
                    setFiltered(response.data);
                })
                return axios.get(`/albums/my/${response.data.id}`)
            }).then(response => {
                setAlbums(response.data);
            })
        axios.get('/genres')
            .then(response => {
                setGenres(response.data);
            });
        axios.get('/users/artists')
            .then(response => {
                setArtists(response.data);
            })
    }, []);

    function search(e) {
        e.preventDefault()
        setSongs(filtered)
        setSongs(filtered.filter(song => song.title.toLowerCase().match(searchString.toLowerCase())))
    }

    return (
        <div className="container">
            <br/>
            <h1 className="display-4">Moje pjesme
                <Form inline style={{float:'right', display:'block'}} onSubmit={search}>
                    <FormControl type="text" placeholder="Traži pjesmu" className="mr-sm-2" onChange={e => setSearchString(e.target.value)} value={searchString}/>
                    <Button variant="outline-success" type="submit">Traži</Button>
                </Form>
            </h1>
            <MySongEdit genres={genres} albums={albums} user={user}/><p> </p>
            <ListGroup>
                {
                    songs.map((song, id) =>
                        <MySong key={id} song={song} genres={genres} albums={albums} artists={artists}/>
                    )
                }
            </ListGroup>
        </div>
    );
}

export default MySongList;