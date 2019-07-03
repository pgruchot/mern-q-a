import React, { Component } from 'react'
import Question from './QuestionCard';
import axios from 'axios';

export default class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: null
        }
    } 

    async componentDidMount() {
        const questions = (await axios.get('/questions/')).data.questions;
        console.log(questions);
        this.setState({
            questions,
        })
    }
    render() {
        return (
            <div className="questions-container">
            {this.state.questions ? (
                this.state.questions.map(question => {
                     return <Question 
                                key={question._id} 
                                _id={question._id}
                                title={question.title}
                                description={question.description}
                                answers={question.answers.length}
                            /> 
                })
            ) : (
                <h2> Loading questions</h2>
            ) }
            </div>
        )
    }
}

