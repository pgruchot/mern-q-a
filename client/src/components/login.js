import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import withAuthContext from './withAuthContext'

//login component, presents form and fires login function from context component
export default withAuthContext(class Login extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
            errors: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.updateErrors = this.updateErrors.bind(this)

    }
    
    updateErrors(errors) {
        this.setState({
            errors: errors
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const errors = this.state.errors ? (
            Object.keys(this.state.errors).map(err => {
                return <h2>{this.state.errors[err]}</h2>
            })
        ) : ( null )

        return (
            <div>
                {this.props.context.isAuth ? (
                    <Redirect to={{ pathname: '/' }} />
                ) : (
                    <div>
                        <div>
                            {errors}
                        </div>
                        <div className="container blue-grey lighten-5
" style={{marginTop: 50 + 'px', borderRadius: 10 + 'px'}}>
                            <div className="row center"  style={{margin: 10 + 'px'}}>
                                <form className="col s12">
                                    <div className="row center">
                                        <div className="input-field col s12">
                                            <input name="username" type="text" className="validate"  onChange={this.handleChange}/>
                                            <label htmlFor="username">Username</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="password" type="password" className="validate" onChange={this.handleChange}/>
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="btn waves-effect waves-light grey darken-3" onClick={(e) => {this.props.context.login(e, this.state.username, this.state.password, this.updateErrors)}}>Submit
                                            <i className="material-icons right">send</i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
})
