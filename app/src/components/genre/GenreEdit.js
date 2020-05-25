import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import axios from "axios";
import {observer} from "mobx-react";

const GenreEdit = observer(() => {
    const [name, setName] = useState("")
    const [msg, setMsg] = useState("")
    let history = useHistory();

    async function nameChanged(event) {
        setName(event.target.value);
    }

    async function newGenre(event) {
        event.preventDefault()
        try {
            await axios({
                method: 'POST',
                url: '/genres/create',
                data: {
                    "genreName": `${name}`
                }
            }).then((e) => {
                if (e.status === 200 || e.status === 201) {
                    history.push('/')
                    history.push('/genres');
                }
            })
        } catch(error) {
            console.log(error);
            setMsg("Neuspješno dodavanje žanra.");
        }
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Žanr" name="name"
                       onChange={nameChanged} value={name}/>
                <div className="input-group-append">
                    <Button variant="primary" type="submit" onClick={newGenre}>Dodaj</Button>
                </div>
            </div>
            <div className="text-danger">{msg}</div>
        </div>
    )
})

export default GenreEdit