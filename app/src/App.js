import React, {useEffect} from 'react'
import UserList from './components/user/UserList'
import Register from './forms/SignUpForm'
import Header from './components/Header'
import Login from './forms/LoginForm'
import Index from './components/notSigned'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {AuthStore} from "./auth/AuthStore";
import CountryList from "./components/country/CountryList";
import CityList from "./components/city/CityList";
import UserSettings from "./components/user/UserSettings";
import GenreList from "./components/genre/GenreList";
import AlbumList from "./components/album/AlbumList";
import MyAlbumList from "./components/album/MyAlbumList";
import MySongList from "./components/song/MySongList";
import SongList from "./components/song/SongList";
import SongInfo from "./components/review/SongInfo";
import ConcertList from "./components/concert/ConcertList";
import MyConcertList from "./components/concert/MyConcertList";
import MyReviewList from "./components/review/MyReviewList";
import ArtistInfo from "./components/artist/ArtistInfo";
import AlbumInfo from "./components/album/AlbumInfo";
import GenreInfo from "./components/genre/GenreInfo";

function App() {
    useEffect(() => {
        const username = localStorage.getItem('username') || '';
        const roles = localStorage.getItem('roles') || '';
        AuthStore.setLoggedIn(username, roles);
    }, [])

    return (
        <BrowserRouter>
            <Header />
            <div className="App container">
                <Switch>
                    <Route path='/' exact component={Index} />
                    <Route path='/sign-up' exact component={Register} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/settings' exact component={UserSettings} />
                    <Route path='/albums' exact component={AlbumList} />
                    <Route path='/songs' exact component={SongList} />
                    <Route path='/songs/:id' exact component={SongInfo} />
                    <Route path='/artists/:id' exact component={ArtistInfo} />
                    <Route path='/album/:id' exact component={AlbumInfo} />
                    <Route path='/genre/:id' exact component={GenreInfo} />
                    <Route path='/concerts' exact component={ConcertList} />
                    <Route path='/my-reviews' exact component={MyReviewList} />

                    <Route path='/my-albums' exact component={MyAlbumList} />
                    <Route path='/my-songs' exact component={MySongList} />
                    <Route path='/my-concerts' exact component={MyConcertList} />

                    <Route path='/users' exact component={UserList} />
                    <Route path='/cities' exact component={CityList} />
                    <Route path='/countries' exact component={CountryList} />
                    <Route path='/genres' exact component={GenreList} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;
