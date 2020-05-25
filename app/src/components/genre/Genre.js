import React, {useState} from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../../forms/Form.css'
import Nav from "react-bootstrap/Nav";

function Genre(props) {
    const {genreId, genreName} = props.genre;
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");
    const [genre, setGenre] = useState(genreName);
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const goToGenre = (id) => {
        history.push(`/genre/${id}`)
    }

    async function nameChanged(event) {
        setGenre(event.target.value);
    }

    let history = useHistory();
    function deleteCountry() {
        axios.delete(`/genres/${genreId}`)
            .then((e) => {
                if (e.status === 200) {
                    history.push('/');
                    history.push('/genres');
                }
            })
    }

    async function handleSave() {
        try {
            await axios({
                method: 'PUT',
                url: `/genres/${genreId}`,
                data: {
                    "id": `${genreId}`,
                    "genreName": `${genre}`
                }
            }).then((e) => {
                if(e.status === 200) {
                    setShow(false);
                    history.push('/');
                    history.push('/genres');
                }
            })
        } catch (error)
        {
            console.log(error);
            setMsg("Neuspješna izmjena.");
        }
    }

    return (
        <tr>
            <td>{genreId}</td>
            <td><Nav.Link onClick={() => goToGenre(genreId)} style={{margin: 0, padding: 0, display: 'inline', color: "#292b2c"}}>{genreName}</Nav.Link></td>
            <td align={"right"}>
                <Button variant="warning" size="sm" onClick={handleShow}>Uredi</Button> {' '}
                <Button variant="danger" size="sm" onClick={deleteCountry}>Obriši</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Uredi žanr</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="form-control" name="genreName" placeholder="Žanr" id="space"
                               onChange={nameChanged} value={genre} required/>
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
            </td>
        </tr>
    );
}

export default Genre;