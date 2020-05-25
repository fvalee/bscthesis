import React, {useEffect, useState} from 'react'
import CardColumns from "react-bootstrap/CardColumns";
import Album from "./Album";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AlbumList() {
    const [albums, setAlbums] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchString, setSearchString] = useState("")

    useEffect(() => {
        fetch('/albums')
            .then(data => data.json())
            .then(data_albums => {
                setAlbums(data_albums)
                setFiltered(data_albums)
            });
    }, [])

    function search(e) {
        e.preventDefault()
        setAlbums(filtered)
        setAlbums(filtered.filter(album => album.albumName.toLowerCase().match(searchString.toLowerCase())))
    }

    return (
        <div className="container">
            <br/>
            <h1 className="display-4">Albumi
                <Form inline style={{float:'right', display:'block'}} onSubmit={search}>
                    <FormControl type="text" placeholder="Traži album" className="mr-sm-2" onChange={e => setSearchString(e.target.value)} value={searchString}/>
                    <Button variant="outline-success" type="submit">Traži</Button>
                </Form>
            </h1>
            <CardColumns>
            {
                albums.map(album =>
                    <Album key={album.albumId} album={album}/>
                )
            }
            </CardColumns>
        </div>
    );
}

export default AlbumList;