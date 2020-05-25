import React, {useEffect, useState} from 'react'
import CardColumns from "react-bootstrap/CardColumns";
import MyAlbum from "./MyAlbum";
import MyAlbumEdit from "./MyAlbumEdit";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function MyAlbumList() {
    const [albums, setAlbums] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchString, setSearchString] = useState("")

    useEffect(() => {
        fetch(`/users/${localStorage.getItem('username')}`)
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                let id = data.id;
                return fetch(`/albums/my/${id}`);
            }).then(response => response.json())
            .then(data => {
                setAlbums(data)
                setFiltered(data)
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
            <h1 className="display-4">Moji albumi
                <Form inline style={{float:'right', display:'block'}} onSubmit={search}>
                    <FormControl type="text" placeholder="Traži album" className="mr-sm-2" onChange={e => setSearchString(e.target.value)} value={searchString}/>
                    <Button variant="outline-success" type="submit">Traži</Button>
                </Form>
            </h1>
            <MyAlbumEdit/><p> </p>
            <CardColumns>
                {
                    albums.map(album =>
                        <MyAlbum key={album.albumId} album={album}/>
                    )
                }
            </CardColumns>
        </div>
    );
}

export default MyAlbumList;