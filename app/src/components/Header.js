import React from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'
import './Style.css'
import NavDropdown from "react-bootstrap/NavDropdown";
import {AuthStore} from "../auth/AuthStore";
import {FaCompactDisc} from "react-icons/fa";

const Header = () => {
    let history = useHistory()

    const goToIndex = () => {
        history.push('/')
    }

    const goToLogin = () => {
        history.push('/login')
    }

    const goToLogout = () => {
        AuthStore.logout()
        history.push('/')
    }

    const goToSignUp = () => {
        history.push('/sign-up')
    }

    const goToSettings = () => {
        history.push('/settings')
    }

    const goToUsers = () => {
        history.push('/users')
    }

    const goToGenres = () => {
        history.push('/genres')
    }

    const goToCities = () => {
        history.push('/cities')
    }

    const goToCountries = () => {
        history.push('/countries')
    }

    const goToAlbums = () => {
        history.push('/albums')
    }

    const goToSongs= () => {
        history.push('/songs')
    }

    const goToConcerts = () => {
        history.push('/concerts')
    }

    const goToMyAlbums = () => {
        history.push('/my-albums')
    }

    const goToMySongs = () => {
        history.push('/my-songs')
    }

    const goToMyConcerts = () => {
        history.push('/my-concerts')
    }

    const goToMyReviews = () => {
        history.push('/my-reviews')
    }

    let navigation;

    if(AuthStore.getLoggedIn() !== '') {
        navigation = (
            <Nav className="mr-auto">
                {AuthStore.isArtist() && <Nav.Link onClick={goToMyAlbums}>Moji albumi</Nav.Link>}
                {AuthStore.isArtist() && <Nav.Link onClick={goToMySongs}>Moje pjesme</Nav.Link>}
                {AuthStore.isArtist() && <Nav.Link onClick={goToMyConcerts}>Moji koncerti</Nav.Link>}

                <Nav.Link onClick={goToAlbums}>Albumi</Nav.Link>
                <Nav.Link onClick={goToSongs}>Pjesme</Nav.Link>
                <Nav.Link onClick={goToConcerts}>Koncerti</Nav.Link>
                <Nav.Link onClick={goToMyReviews}>Moji osvrti</Nav.Link>

                {AuthStore.isAdmin() && <Nav.Link onClick={goToUsers}>Korisnici</Nav.Link>}
                {AuthStore.isAdmin() && <Nav.Link onClick={goToGenres}>Žanrovi</Nav.Link>}
                {AuthStore.isAdmin() && <Nav.Link onClick={goToCities}>Gradovi</Nav.Link>}
                {AuthStore.isAdmin() && <Nav.Link onClick={goToCountries}>Države</Nav.Link>}

                <NavDropdown title={AuthStore.getLoggedIn()} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={goToSettings}>Uredi profil</NavDropdown.Item>
                    <NavDropdown.Item onClick={goToLogout}>Odjava</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        )
    }
    else {
        navigation = (
            <Nav className="mr-auto">
                <Nav.Link onClick={goToAlbums}>Albumi</Nav.Link>
                <Nav.Link onClick={goToSongs}>Pjesme</Nav.Link>
                <Nav.Link onClick={goToConcerts}>Koncerti</Nav.Link>
                <Nav.Link onClick={goToSignUp}>Registracija</Nav.Link>
                <Nav.Link onClick={goToLogin}>Prijava</Nav.Link>
            </Nav>
        )
    }

    return(
        <Navbar bg="light" expand="lg">
            <Link to='/'>
                <Navbar.Brand onClick={goToIndex}>
                    <FaCompactDisc/> {' '} Web aplikacija za glazbena djela
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {navigation}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;