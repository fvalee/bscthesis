import React from 'react'
import City from "./City";
import CityEdit from "./CityEdit";

class CityList extends React.Component {
    state = {
        city: [],
        countries: []
    };

    componentDidMount() {
        fetch('/cities')
            .then(data => data.json())
            .then(data_cities => this.setState({city: data_cities}));
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h1 className="display-4">Popis gradova</h1>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Grad</th>
                        <th>Poštanski broj</th>
                        <th>Država</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.city.map(city =>
                            <City key={city.id} city={city}/>
                        )
                    }
                    </tbody>
                </table>
                <CityEdit/>
            </div>
        );
    }
}

export default CityList;