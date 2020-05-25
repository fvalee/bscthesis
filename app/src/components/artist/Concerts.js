import ListGroup from "react-bootstrap/ListGroup";
import Media from "react-bootstrap/Media";
import React from "react";

function Concerts(props) {
    const {city, date, time} = props.concert;

    let d = date.split("-")
    let t = time.split(":")
    let today = new Date(Date.now())
    let concertDate = new Date(d[0], d[1] - 1, d[2], t[0], t[1])

    if(concertDate > today) {
        return (
            <ListGroup.Item>
                <Media>
                    <Media.Body>
                        <h5 style={{margin: 0, padding: 0}}>{city.cityName}, {city.country.countryName}
                            <br/>
                            <small className="text-muted">{new Date(date).toLocaleDateString()} • {time}</small><br/>
                        </h5>
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
                        <h5 style={{margin: 0, padding: 0}}>{city.cityName}, {city.country.countryName}
                            <br/>
                            <small className="text-muted">{new Date(date).toLocaleDateString()} • {time}</small><br/>
                        </h5>
                    </Media.Body>
                </Media>
            </div>
        )
    }
}

export default Concerts