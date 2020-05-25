import React, {useState} from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../../forms/Form.css'

function Country(props) {
    const {id, countryName} = props.country;
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");
    const [country, setCountry] = useState(countryName);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    async function nameChanged(event) {
        setCountry(event.target.value);
    }

    let history = useHistory();
    function deleteCountry() {
        axios.delete(`/countries/${id}`)
            .then((e) => {
                if (e.status === 200) {
                    history.push('/');
                    history.push('/countries');
                }
            })
    }

    async function handleSave() {
        try {
            await axios({
                method: 'PUT',
                url: `/countries/${id}`,
                data: {
                    "id": `${id}`,
                    "countryName": `${country}`
                }
            }).then((e) => {
                if(e.status === 200) {
                    setShow(false);
                    history.push('/');
                    history.push('/countries');
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
            <td>{id}</td>
            <td>{countryName}</td>
            <td align={"right"}>
                <Button variant="warning" size="sm" onClick={handleShow}>Uredi</Button> {' '}
                <Button variant="danger" size="sm" onClick={deleteCountry}>Obriši</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Uredi državu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="form-control" name="username" placeholder="Država" id="space"
                               onChange={nameChanged} value={country} required/>
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

export default Country;