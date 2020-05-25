import React, {useEffect, useState} from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import {AuthStore} from "../../auth/AuthStore";
import MyConcertEdit from "./MyConcertEdit";
import MyConcert from "./MyConcert";

function MyConcertList() {
    const [concerts, setConcerts] = useState([])
    const [user, setUser] = useState([])
    const [cities, setCities] = useState([])

    useEffect(() => {
        axios.get(`/cities/`)
            .then(response => setCities(response.data))
        axios.get(`/users/${AuthStore.getLoggedIn()}`)
            .then(response => {
                setUser(response.data);
                return axios.get(`/concerts/${response.data.id}`)
            })
            .then(response => {
                setConcerts(response.data);
            });
    }, []);

    return (
        <div className="container">
            <br/>
            <h1 className="display-4">Moji koncerti</h1>
            <MyConcertEdit user={user} />
            <ListGroup>
                {
                    concerts.map((concert, id) =>
                        <MyConcert key={id} concert={concert} cities={cities}/>
                    )
                }
            </ListGroup>
        </div>
    );
}

export default MyConcertList