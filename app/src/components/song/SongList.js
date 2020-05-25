import React, {useEffect, useState} from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import Song from "./Song";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SongList() {
    const [songs, setSongs] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchString, setSearchString] = useState("")

    useEffect(() => {
        axios.get('songs')
            .then(response => {
                setSongs(response.data);
                setFiltered(response.data);
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
            <h1 className="display-4">Pjesme
                <Form inline style={{float:'right', display:'block'}} onSubmit={search}>
                    <FormControl type="text" placeholder="Traži pjesmu" className="mr-sm-2" onChange={e => setSearchString(e.target.value)} value={searchString}/>
                    <Button variant="outline-success" type="submit">Traži</Button>
                </Form>
            </h1>
            <ListGroup>
                {
                    songs.map(song =>
                        <Song key={song.id} song={song}/>
                    )
                }
                {songs.length === 0 ? "Vaš upit ne pronalazi pjesme." : ""}
            </ListGroup>
        </div>
    );
}

export default SongList;