import React from 'react';
import Media from "react-bootstrap/Media";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory } from 'react-router-dom'
import Nav from "react-bootstrap/Nav";

function Concert(props) {
    const {user, city, date, time} = props.concert;
    let history = useHistory();

    const goToArtist = (id) => {
        history.push(`/artists/${id}`)
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
                        <h5 style={{margin: 0, padding: 0}}>
                            <Nav.Link onClick={() => goToArtist(user.id)} style={{
                                margin: 0,
                                padding: 0,
                                display: 'inline',
                                color: "#212529"
                            }}>{user.stageName}</Nav.Link>
                            <br/>
                            <small className="text-muted">{city.cityName}, {city.country.countryName}</small><br/>
                        </h5>
                        <small>{new Date(date).toLocaleDateString()} • {time}</small>
                    </Media.Body>
                </Media>
            </ListGroup.Item>
        )
    }
    else {
        return (
            <div className="list-group-item list-group-item-light">
                <Media>
                    <Media.Body>
                        <h5 style={{margin: 0, padding: 0}}>
                            <Nav.Link onClick={() => goToArtist(user.id)} style={{
                                margin: 0,
                                padding: 0,
                                display: 'inline',
                                color: "#6c757d"
                            }}>{user.stageName}</Nav.Link>
                            <br/>
                            <small className="text-muted">{city.cityName}, {city.country.countryName}</small><br/>
                        </h5>
                        <small>{new Date(date).toLocaleDateString()} • {time}</small>
                    </Media.Body>
                </Media>
            </div>
        )
    }
}

export default Concert;