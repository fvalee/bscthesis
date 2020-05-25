import React, {useEffect, useState} from "react";
import axios from "axios";
import '../../forms/Form.css'
import { useHistory } from 'react-router-dom'
import {AuthStore} from "../../auth/AuthStore";

function UserSettings() {
    const [user, setUser] = useState([]);
    const [msg, setMsg] = useState("")
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [stageName, setStageName] = useState(user.stageName);
    let history = useHistory();

    useEffect(() => {
        axios.get(`/users/${localStorage.getItem('username')}`)
            .then(function(response) {
                setUser(response.data);
                setEmail(response.data.email);
                setName(response.data.name);
                setSurname(response.data.surname);
                setStageName(response.data.stageName);
            });
    }, []);

    async function handleSave(e) {
        e.preventDefault();
        try {
            await axios({
                method: 'PUT',
                url: `/users/${user.username}`,
                data: {
                    "email" : `${email}`,
                    "username": `${user.username}`,
                    "name": `${name}`,
                    "surname": `${surname}`,
                    "password": `${password}`,
                    "isArtist": `${AuthStore.isArtist()}`,
                    "stageName": `${stageName}`
                }
            }).then((e) => {
                if(e.status === 200) {
                    history.push('/');
                    history.push('/settings');
                }
            })
        } catch (error)
        {
            console.log(error);
            setMsg("Neuspješna izmjena.");
        }
    }

    function emailChanged(event) {
        setEmail(event.target.value);
    }

    function nameChanged(event) {
        setName(event.target.value);
    }

    function surnameChanged(event) {
        setSurname(event.target.value);
    }

    function passwordChanged(event) {
        setPassword(event.target.value);
    }

    function stageNameChanged(event) {
        setStageName(event.target.value);
    }

    return(
        <div className="card" id="container">
            <div className="card-body">
                <h1 id="space" className="display-4">Bok, {localStorage.getItem('username')}!</h1>
                <form onSubmit={(e) => handleSave(e)}>
                    <div id="space">
                        <input type="email" className="form-control" name="email" placeholder="E-mail" onChange={emailChanged} value={email} required />
                    </div>
                    <div id="space">
                        <input type="password" className="form-control" name="password" placeholder="Lozinka" onChange={passwordChanged} value={password} required />
                    </div>
                    <div id="space">
                        <input type="text" className="form-control" name="name" placeholder="Ime" onChange={nameChanged} value={name} />
                    </div>
                    <div id="space">
                        <input type="text" className="form-control" name="surname" placeholder="Prezime" onChange={surnameChanged} value={surname} />
                    </div>
                    {AuthStore.isArtist() && <hr/>}
                    {AuthStore.isArtist() && <div id="space">
                        <input type="text" className="form-control" name="stageName" placeholder="Umjetničko ime" onChange={stageNameChanged} value={stageName} required/>
                    </div>}
                    <div className="text-danger">{msg}</div>
                    <button className="btn btn-primary" type="submit" id="space">Spremi</button>
                </form>
            </div>
        </div>
    )
}

export default UserSettings