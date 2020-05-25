import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import axios from "axios";
import {observer} from "mobx-react";

const CountryEdit = observer(() => {
    const [name, setName] = useState("")
    const [msg, setMsg] = useState("")
    let history = useHistory();

    async function nameChanged(event) {
        setName(event.target.value);
    }

    async function newCountry(event) {
        event.preventDefault()
        try {
            await axios({
                method: 'POST',
                url: '/countries/create',
                data: {
                    "countryName": `${name}`
                }
            }).then((e) => {
                if (e.status === 200 || e.status === 201) {
                    history.push('/')
                    history.push('/countries');
                }
            })
        } catch(error) {
            console.log(error);
            setMsg("Neuspješno dodavanje države.");
        }
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Država" name="name"
                       onChange={nameChanged} value={name}/>
                <div className="input-group-append">
                    <Button variant="primary" type="submit" onClick={newCountry}>Dodaj</Button>
                </div>
            </div>
            <div className="text-danger">{msg}</div>
        </div>
    )
})

export default CountryEdit