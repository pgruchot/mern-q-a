import React, { Component } from 'react'
import withAuthContext from './withAuthContext'
import axios from 'axios'

//component used to present add question form and handle axios post requests
export default withAuthContext(class AddQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            errors: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        axios.post('/questions', {
            author: this.props.context.user.local.username,
            title: this.state.title,
            description: this.state.description,
        } ).then(response => {
            if(!response.data.errors) {
                this.setState({
                    title: '',
                    description: '',
                    errors: response.data.errors
                })
            } else {
                this.setState({
                    errors: response.data.errors
                })
            }
        })
    }
    render() {
        const { errors } = this.state
        const form = this.props.context.isAuth ? (
             <div>
                    <div>   
                        {errors}
                    </div>
                    <div className="container blue-grey lighten-5" style={{marginTop: 50 + 'px', borderRadius: 10 + 'px'}}>
                        <div className="row center" style={{margin: 10 + 'px'}}>
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name="title" type="text" className="validate"  onChange={this.handleChange}/>
                                        <label htmlFor="title">Title</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name="description" type="text" className="validate"  onChange={this.handleChange}/>
                                        <label htmlFor="description">Description</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="btn waves-effect waves-light grey darken-3" onClick={this.handleSubmit}>Submit
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        ) : (null)

        return (
            form
        )

    }
})
