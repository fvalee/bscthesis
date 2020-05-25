import React, {useEffect, useState} from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import Concert from "./Concert";

function ConcertList() {
    const [concerts, setConcerts] = useState([])

    useEffect(() => {
        axios.get('/concerts/')
            .then(response => {
                setConcerts(response.data);
            });
    }, []);

    return (
        <div className="container">
            <br/>
            <h1 className="display-4">Koncerti</h1>
            <ListGroup>
                {
                    concerts.map((concert, id) =>
                        <Concert key={id} concert={concert}/>
                    )
                }
            </ListGroup>
        </div>
    );
}

export default ConcertList