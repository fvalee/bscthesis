import React, {useState} from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../../forms/Form.css'
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

function MyAlbum(props) {
    const {albumName, imageLink, creator, albumId} = props.album;
    const [name, setName] = useState(albumName);
    const [link, setLink] = useState(imageLink);
    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);
    let history = useHistory();

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    async function nameChanged(event) {
        setName(event.target.value);
    }

    async function linkChanged(event) {
        setLink(event.target.value);
    }

    const goToAlbum = (id) => {
        history.push(`/album/${id}`)
    }

    async function handleSave() {
        try {
            await axios({
                method: 'PUT',
                url: `/albums/${albumId}`,
                data: {
                    "id": `${albumId}`,
                    "albumName": `${name}`,
                    "imageLink": `${link}`,
                    "creatorId": `${creator.id}`
                }
            }).then((e) => {
                if(e.status === 200) {
                    setShow(false);
                    history.push('/');
                    history.push('/my-albums');
                }
            })
        } catch (error)
        {
            console.log(error);
            setMsg("Neuspješna izmjena.");
        }
    }

    function handleDelete() {
        axios.delete(`/albums/${albumId}`)
            .then((e) => {
                if (e.status === 200) {
                    history.push('/');
                    history.push('/my-albums');
                }
            })
    }

    return (
        <Card style={{ width: '16rem' }}>
            <Card.Img variant="top" src={imageLink === "" ? "blank.png": imageLink} />
            <Card.Body>
                <p className="h4"><Nav.Link onClick={() => goToAlbum(albumId)} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{albumName}</Nav.Link></p>
                <Button variant="warning" size="sm" type="submit" onClick={handleShow}>Uredi</Button>{' '}
                <Button variant="danger" size="sm" type="submit" onClick={handleDelete}>Obriši</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Uredi album</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="form-control" name="name" placeholder="Naziv albuma" id="space"
                               onChange={nameChanged} value={name} required/>
                        <input type="text" className="form-control" name="link" placeholder="Slika albuma" id="space"
                               onChange={linkChanged} value={link} required/>
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
            </Card.Body>
        </Card>
    );
}

export default MyAlbum;