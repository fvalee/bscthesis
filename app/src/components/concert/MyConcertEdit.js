import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import axios from "axios";
import {observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";

const MyConcertEdit = observer((props) => {
    const user = props.user

    const [city, setCity] = useState([])
    const [selCity, setSelCity] = useState(0)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const [msg, setMsg] = useState("")
    const [show, setShow] = useState(false);
    let history = useHistory();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    useEffect(() => {
        axios.get('/cities/')
            .then(response => {
                setCity(response.data);
                setSelCity(response.data[0].id);
            });
    }, [])

    async function cityChanged(event) {
        setSelCity(Number(event.target.value));
        console.log(selCity)
    }

    async function dateChanged(event) {
        setDate(event.target.value);
    }

    async function timeChanged(event) {
        setTime(event.target.value);
    }

    async function handleSave(event) {
        event.preventDefault()
        try {
            await axios({
                method: 'POST',
                url: `concerts/${user.id}/create`,
                data: {
                    "artistId": Number(user.id),
                    "cityId": Number(selCity),
                    "date": `${date}`,
                    "time": `${time}`
                }
            }).then((e) => {
                if (e.status === 200 || e.status === 201) {
                    history.push('/')
                    history.push('/my-concerts');
                }
            })
        } catch (error) {
            console.log(error);
            setMsg("Neuspješno dodavanje koncerta.");
        }
    }

    return (
        <div>
            <Button variant="primary" size="sm" onClick={handleShow}>Dodaj koncert</Button><p> </p>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj koncert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select className="form-control" name="city" id="space" onChange={cityChanged}>
                        {city.map((city, id) =>
                            <option key={id} value={city.id}>{city.cityName}</option>
                        )}
                    </select>
                    <input type="date" className="form-control" placeholder="Unesi datum koncerta." name="date" id="space"
                           onChange={dateChanged} value={date}/>
                    <input type="time" className="form-control" placeholder="Unesi vrijeme koncerta." name="time" id="space"
                           onChange={timeChanged} value={time}/>
                    <div className="text-danger">{msg}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Odustani
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Dodaj koncert
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
})

export default MyConcertEdit