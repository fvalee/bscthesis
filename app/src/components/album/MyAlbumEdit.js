import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import axios from "axios";
import {observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";

const MyAlbumEdit = observer(() => {
    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [user, setUser] = useState([])
    const [msg, setMsg] = useState("")
    const [show, setShow] = useState(false);
    let history = useHistory();

    useEffect(() => {
        axios.get(`/users/${localStorage.getItem('username')}`)
            .then(response => {
                setUser(response.data);
            });
    }, []);

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

    async function handleSave(event) {
        event.preventDefault()
        try {
            await axios({
                method: 'POST',
                url: '/albums/create',
                data: {
                    "albumName": `${name}`,
                    "imageLink": `${link}`,
                    "creatorId": `${user.id}`
                }
            }).then((e) => {
                if (e.status === 200 || e.status === 201) {
                    history.push('/')
                    history.push('/my-albums');
                }
            })
        } catch(error) {
            console.log(error);
            setMsg("Neuspješno dodavanje albuma.");
        }
    }

    return (
        <div>
            <Button variant="primary" size="sm" onClick={handleShow}>Dodaj album</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control" name="name" placeholder="Naziv albuma" id="space"
                           onChange={nameChanged} value={name} required/>
                    <input type="text" className="form-control" name="link" placeholder="Slika albuma" id="space"
                           onChange={linkChanged} value={link} />
                    <div className="text-danger">{msg}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Odustani
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Dodaj album
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
})

export default MyAlbumEdit