import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './Form.css'
import {AuthStore} from "../auth/AuthStore";
import {observer} from "mobx-react";

const Login = observer(() => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    let history = useHistory();

    async function usernameChanged(event) {
        setUsername(event.target.value);
    }
    function passwordChanged(event) {
        setPassword(event.target.value);
    }

    async function login(event) {
        event.preventDefault()
        try {
            await axios({
                method: 'POST',
                url: '/login',
                data: {
                    "username": `${username}`,
                    "password": `${password}`
                }
            }).then((e) => {
                if (e.status === 200) {
                    localStorage.setItem('username', username);
                    AuthStore.setLoggedIn(username, '');
                    AuthStore.setToken(e.headers.authorization);
                    history.push('/');

                    return axios({
                        method: 'GET',
                        url: '/users/current-user'
                    })
                }
            }).then((e) => {
                if (e.status === 200) {
                    AuthStore.setRoles(e.data.authorities);
                }
            })
        } catch(error) {
            console.log(error);
            setMsg("Neuspješna prijava.");
        }
    }

    useEffect(() => {
        if(AuthStore.getLoggedIn()!=='') history.push('/')
    },[history])

    return(
        <div className="card" id="container">
            <div className="card-body">
                <h1 id="space" className="display-4">Prijava</h1>
                <form onSubmit={login}>
                    <div id="space">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                            </div>
                            <input type="text" className="form-control" name="username" placeholder="Korisničko ime"
                                   onChange={usernameChanged} value={username} required/>
                        </div>
                    </div>
                    <div id="space">
                        <input type="password" className="form-control" name="password" placeholder="Lozinka"
                               onChange={passwordChanged} value={password} required/>
                    </div>
                    <div className="text-danger">{msg}</div>
                    <button className="btn btn-primary" type="submit" id="space">Prijava</button>
                </form>
            </div>
        </div>
    )
})

export default Login