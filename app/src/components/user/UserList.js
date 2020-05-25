import React from 'react'
import User from './User'

class UserList extends React.Component {
    state = {
        users: []
    };

    componentDidMount() {
        fetch('/users')
            .then(data => data.json())
            .then(data_users => this.setState({users: data_users}));
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h1 className="display-4">Popis korisnika</h1>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Korisničko ime</th>
                        <th>E-mail</th>
                        <th>Izvođač?</th>
                        <th>Umjetničko ime</th>
                        <th> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users.map(user =>
                            <User key={user.id} user={user}/>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserList;