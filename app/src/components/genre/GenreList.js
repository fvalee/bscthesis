import React from 'react'
import Genre from "./Genre";
import GenreEdit from "./GenreEdit";

class GenreList extends React.Component {
    state = {
        genre: []
    };

    componentDidMount() {
        fetch('/genres')
            .then(data => data.json())
            .then(data_genres => this.setState({genre: data_genres}));
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h1 className="display-4">Popis žanrova</h1>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Žanr</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.genre.map(genre =>
                            <Genre key={genre.genreId} genre={genre}/>
                        )
                    }
                    </tbody>
                </table>
                <GenreEdit/>
            </div>
        );
    }
}

export default GenreList;