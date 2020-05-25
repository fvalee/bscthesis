import React, {useState} from 'react';
import Media from "react-bootstrap/Media";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory } from 'react-router-dom'
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyConcert(props) {
    const {id, user, city, date, time} = props.concert;
    const cities = props.cities;
    let history = useHistory();

    const [msg, setMsg] = useState("")
    const [selDate, setSelDate] = useState(date)
    const [selTime, setSelTime] = useState(time)
    const [selCity, setSelCity] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setSelCity(props.cities[0].id)
        setShow(true);
    }

    function cityChanged(event) {
        setSelCity(event.target.value)
    }
    function dateChanged(event) {
        setSelDate(event.target.value)
    }
    function timeChanged(event) {
        setSelTime(event.target.value)
    }

    function handleDelete(event) {
        event.preventDefault()
        axios.delete(`/concerts/${id}`)
            .then((e) => {
                if (e.status === 200) {
                    history.push('/');
                    history.push('/my-concerts');
                }
            })
    }
    async function handleSave(event) {
        event.preventDefault()
        try {
            await axios({
                method: 'PUT',
                url: `/concerts/${id}/update`,
                data: {
                    "id": Number(id),
                    "artistId": Number(user.id),
                    "cityId": Number(selCity),
                    "date": `${selDate}`,
                    "time": `${selTime}`
                }
            }).then(e => {
                if (e.status === 200) {
                    history.push('/')
                    history.push('/my-concerts');
                }
            })
        } catch (e) {
            setMsg("Neuspješno uređivanje koncerta.");
        }
    }

    let d = date.split("-")
    let t = time.split(":")
    let today = new Date(Date.now())
    let concertDate = new Date(d[0], d[1] - 1, d[2], t[0], t[1])

    if(concertDate > today) {
        return (
            <ListGroup.Item>
                <Media>
                    <Media.Body>
                        <h5 style={{margin: 0, padding: 0}}>{city.cityName}, {city.country.countryName}
                            <br/>
                            <small className="text-muted">{new Date(date).toLocaleDateString()} • {time}</small><br/>
                        </h5>
                        <Button className="badge badge-pill badge-warning" variant="warning"
                                onClick={handleShow}>Uredi</Button>{' '}
                        <Button className="badge badge-pill badge-danger" variant="danger"
                                onClick={handleDelete}>Obriši</Button>
                    </Media.Body>
                </Media>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Uredi koncert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <select className="form-control" name="city" id="space" onChange={cityChanged}>
                            {cities.map((city, id) =>
                                <option key={id} value={city.id}>{city.cityName}</option>
                            )}
                        </select>
                        <input type="date" className="form-control" placeholder="Unesi datum koncerta." name="date"
                               id="space"
                               onChange={dateChanged} value={selDate}/>
                        <input type="time" className="form-control" placeholder="Unesi vrijeme koncerta." name="time"
                               id="space"
                               onChange={timeChanged} value={selTime}/>
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
            </ListGroup.Item>
        )
    }
    else {
        return(
            <div className="list-group-item list-group-item-light">
                <Media>
                    <Media.Body>
                        <h5 style={{margin: 0, padding: 0}}>{city.cityName}, {city.country.countryName}
                            <br/>
                            <small className="text-muted">{new Date(date).toLocaleDateString()} • {time}</small><br/>
                        </h5>
                    </Media.Body>
                </Media>
            </div>
        )
    }
}

export default MyConcert;