import { observable } from 'mobx'

class authStore {
    loggedIn = observable({loggedIn: ''})
    token = observable({token: ''})
    roles = observable({roles: []})

    isArtist() {
        return this.getRoles().includes('ARTIST')
    }

    isAdmin() {
        return this.getRoles().includes('ADMIN')
    }

    setToken(token) {
        localStorage.setItem('token', token)
        this.token.token = token
    }

    getToken() {
        return this.token.token
    }

    setRoles(roles) {
        localStorage.setItem('roles', roles)
        this.roles.roles = roles
    }

    getRoles() {
        if(this.roles.roles.length === 0) {
            this.roles.roles = localStorage.getItem('roles')
        }
        return this.roles.roles
    }

    logout() {
        localStorage.setItem('username', '')
        localStorage.setItem('roles', '')
        localStorage.setItem('token', '')
        this.loggedIn.loggedIn = ''
        this.roles.roles = ''
    }

    setLoggedIn(username, roles) {
        localStorage.setItem('username', username)
        localStorage.setItem('roles', roles)
        this.loggedIn.loggedIn = username
        this.roles.roles = roles
    }

    getLoggedIn() {
        return this.loggedIn.loggedIn
    }
}

export const AuthStore = new authStore()
