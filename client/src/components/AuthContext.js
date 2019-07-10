import React, { Component } from 'react'
import axios from 'axios'


//context component
const AuthContext = React.createContext();

class AuthProvider extends Component {
    constructor() {
        super();

        this.state = {
            isAuth: false,
            user: null
        }
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        axios.get('/auth/user').then(response =>{
            if(response.data.user) {
                this.setState({
                    isAuth: true,
                    user: response.data.user
                })
            } else {
                this.setState({
                    isAuth: false,
                    user: null
                })
            }
        })
    }

    login(e, username, password, updateErrors) {
        e.preventDefault()
        axios.post('/auth/login', {
            username,
            password
        }).then(response => {
            if (response.data.user) {
                this.setState({
                    isAuth: true,
                    user: response.data.user
                })
            } else {
                    updateErrors(response.data.errors)
            }
            }
        )
    }

    logout(e) {
        e.preventDefault()
        axios.post('/auth/logout')
            .then(response => {
                this.setState({
                    isAuth: false,
                    user: null
                })
            })
    }

    render() {
        return (
            <AuthContext.Provider value={{ isAuth: this.state.isAuth, login: this.login, logout: this.logout, user: this.state.user }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export { AuthProvider, AuthContext }