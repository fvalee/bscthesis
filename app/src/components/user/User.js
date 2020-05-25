import React from 'react';
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import axios from "axios";

function User(props) {
    const {id, username, email, name, surname, stageName, artist} = props.user;
    let history = useHistory();

    function deleteUser() {
        axios.delete(`/users/${username}`)
            .then((e) => {
                if (e.status === 200) {
                    history.push('/');
                    history.push('/users');
                }
            })
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{artist ? "DA" : "NE"}</td>
            <td>{stageName}</td>
            <td align={"right"}>
                {!(username === "admin") && <Button variant="danger" size="sm" onClick={deleteUser}>Obriši</Button>}
            </td>
        </tr>
    );
}

export default User;