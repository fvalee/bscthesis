import React from 'react'
import './Form.css'

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        isArtist: '',
        stageName: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname,
            isArtist: this.state.isArtist,
            stageName: this.state.stageName
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/users/sign-up', options)
            .then(response => {
                if(response.status === 400) {
                    this.setState({error: 'Registracija neuspješna.'});
                }
                else {
                    this.props.history.push('/login'); //napraviti neki redirect da ne ostanu podaci u formi
                }
            });
    };

    render() {
        return (
            <div className="card" id="container">
                <div className="card-body">
                    <h1 id="space" className="display-4">Registracija</h1>
                    <form onSubmit={this.onSubmit}>
                        <div id="space">
                            <input type="email" className="form-control" name="email" placeholder="E-mail" onChange={this.handleChange} value={this.state.email} required />
                        </div>
                        <div id="space">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                </div>
                                <input type="text" className="form-control" name="username" placeholder="Korisničko ime" onChange={this.handleChange} value={this.state.username} required />
                            </div>
                        </div>
                        <div id="space">
                            <input type="password" className="form-control" name="password" placeholder="Lozinka" onChange={this.handleChange} value={this.state.password} required />
                        </div>
                        <div id="space">
                            <input type="text" className="form-control" name="name" placeholder="Ime" onChange={this.handleChange} value={this.state.name} />
                        </div>
                        <div id="space">
                            <input type="text" className="form-control" name="surname" placeholder="Prezime" onChange={this.handleChange} value={this.state.surname} />
                        </div>
                        <hr/>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="isArtist" checked={this.state.isArtist}
                                   onChange={(event) => {
                                       this.handleChange({
                                       target: {name: event.target.name, value: event.target.checked}
                                       })
                                   }}
                            />
                                <label className="form-check-label" htmlFor="gridCheck">
                                    Registriraj me kao izvođača.
                                </label>
                        </div>
                        <div id="space">
                            <input type="text" className="form-control" name="stageName" placeholder="Umjetničko ime" onChange={this.handleChange} value={this.state.stageName} />
                        </div>
                        <div className="text-danger">{this.state.error}</div>
                        <button className="btn btn-primary" type="submit" id="space">Registracija</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default Register;