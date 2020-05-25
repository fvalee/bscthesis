import ListGroup from "react-bootstrap/ListGroup";
import React, {useEffect, useState} from "react";
import axios from "axios";
import MyReviews from "./MyReviews";

function MyReviewList() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`/reviews/my`)
            .then((e) => {
                if (e.status === 200) {
                    setReviews(e.data)
                }
            })
    }, []);

    return (
        <div className="container">
            <br/>
            <h1 className="display-4">Moji osvrti</h1>
            <ListGroup>
                {
                    reviews.map((review, id) =>
                        <MyReviews key={id} review={review}/>
                    )
                }
            </ListGroup>
        </div>
    )
}

export default MyReviewList