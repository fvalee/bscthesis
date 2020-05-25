import React from 'react'
import Country from "./Country";
import CountryEdit from "./CountryEdit";

class CountryList extends React.Component {
    state = {
        country: []
    };

    componentDidMount() {
        fetch('/countries')
            .then(data => data.json())
            .then(data_countries => this.setState({country: data_countries}));
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h1 className="display-4">Popis država</h1>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Država</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.country.map(country =>
                            <Country key={country.id} country={country}/>
                        )
                    }
                    </tbody>
                </table>
                <CountryEdit/>
            </div>
        );
    }
}

export default CountryList;