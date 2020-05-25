import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../../forms/Form.css'

function City(props) {
    const {id, cityName, postcode, country} = props.city;
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");
    const [city, setCity] = useState(cityName);
    const [pcode, setPcode] = useState(postcode);
    const [selId, setSelId] = useState(country.id);
    const [countryList, setCountryList] = useState([]);
    const [selCountry, setSelCountry] = useState(country.countryName);

    let history = useHistory();

    useEffect(() => {
        axios.get('/countries')
            .then(response => {
                setCountryList(response.data);
                setSelId(response.data[0].id);
                setSelCountry(response.data[0].countryName);
            });
    }, []);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    async function nameChanged(event) {
        setCity(event.target.value);
    }

    async function postcodeChanged(event) {
        setPcode(event.target.value);
    }

    async function countryChanged(event) {
        let cty = event.target.value.split(",")
        setSelId(cty[0])
        setSelCountry(cty[1])
    }

    function deleteCity() {
        axios.delete(`/cities/${id}`)
            .then((e) => {
                if (e.status === 200) {
                    history.push('/');
                    history.push('/cities');
                }
            })
    }

    async function handleSave() {
        try {
            await axios({
                method: 'PUT',
                url: `/cities/${id}`,
                data: {
                    "id": `${id}`,
                    "cityName": `${city}`,
                    "postcode": `${pcode}`,
                    "country": {
                        "id":`${selId}`,
                        "countryName":`${selCountry}`
                    }
                }
            }).then((e) => {
                if(e.status === 200) {
                    setShow(false);
                    history.push('/');
                    history.push('/cities');
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
            <td>{cityName}</td>
            <td>{postcode}</td>
            <td>{country.countryName}</td>
            <td align={"right"}>
                <Button variant="warning" size="sm" onClick={handleShow}>Uredi</Button> {' '}
                <Button variant="danger" size="sm" onClick={deleteCity}>Obriši</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Uredi grad</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="form-control" name="username" placeholder="Grad" id="space"
                               onChange={nameChanged} value={city} required/>
                        <input type="text" className="form-control" placeholder="Poštanski broj" name="postcode" id="space"
                               onChange={postcodeChanged} value={pcode}/>
                        <select className="form-control" name="country" id="space" onChange={countryChanged}>
                            {countryList.map(country =>
                                <option key={country.id} value={[country.id,country.countryName]}>{country.countryName}</option>
                            )}
                        </select>
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

export default City;