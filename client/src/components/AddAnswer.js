import React, { Component } from 'react'
import withAuthContext from './withAuthContext'
import axios from 'axios';

export default withAuthContext(class AddAnswer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: '',
            errors: '',
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
        axios.post(`/questions/answer/${this.props.questionId}`, {
            answer: this.state.answer,
            author: this.props.context.user.local.username
        }).then(response => {
            this.setState({
                errors: response.data.errors
            })
        }) 
    }
    render() {
        const errors = this.state.errors ? (
            Object.keys(this.state.errors).map(err => {
                return <h2>{this.state.errors[err]}</h2>
            })
        ) : ( null )

        const answer = this.props.context.isAuth ? (
            <div>
                <div>   
                    {errors}
                </div>
                <div className="row">
                    <div className="input-field col s12">
                            <input name="answer" type="text" className="validate"  onChange={this.handleChange}/>
                            <label htmlFor="answer">Answer</label>
                    </div>
                </div>
                <div className="row">
                    <button className="btn waves-effect waves-light grey darken-3 right" onClick={this.handleSubmit}>Submit
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        ) : (null)
        return (
            answer
        )
    }
})
