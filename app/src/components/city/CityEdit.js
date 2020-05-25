import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import axios from "axios";

function CityEdit() {
    const [name, setName] = useState("")
    const [postcode, setPostcode] = useState("")
    const [country, setCountry] = useState([]);
    const [selCountry, setSelCountry] = useState("")
    const [selId, setSelId] = useState("")
    const [msg, setMsg] = useState("")
    let history = useHistory();

    useEffect(() => {
        axios.get('/countries')
            .then(response => {
                setCountry(response.data);
                setSelId(response.data[0].id);
                setSelCountry(response.data[0].countryName);
            });
    }, []);

    async function nameChanged(event) {
        setName(event.target.value);
    }
    async function postcodeChanged(event) {
        setPostcode(event.target.value);
    }
    function countryChanged(event) {
        let cty = event.target.value.split(",")
        setSelId(cty[0])
        setSelCountry(cty[1])
    }

    async function newCity(event) {
        event.preventDefault()
        try {
            await axios({
                method: 'POST',
                url: '/cities/create',
                data: {
                    "cityName": `${name}`,
                    "postcode": `${postcode}`,
                    "country": {
                        "id":`${selId}`,
                        "countryName":`${selCountry}`
                    }
                }
            }).then((e) => {
                if (e.status === 200 || e.status === 201) {
                    history.push('/')
                    history.push('/cities');
                }
            })
        } catch(error) {
            console.log(error);
            setMsg("Neuspješno dodavanje grada.");
        }
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Grad" name="name"
                       onChange={nameChanged} value={name}/>
                <input type="text" className="form-control" placeholder="Poštanski broj" name="postcode"
                       onChange={postcodeChanged} value={postcode}/>
                <select className="form-control" name="country" id="select" onChange={countryChanged}>
                    {country.map(country =>
                        <option key={country.id} value={[country.id,country.countryName]}>{country.countryName}</option>
                    )}
                </select>
                <div className="input-group-append">
                    <Button variant="primary" type="submit" onClick={newCity}>Dodaj</Button>
                </div>
            </div>
            <div className="text-danger">{msg}</div>
        </div>
    )
}

export default CityEdit