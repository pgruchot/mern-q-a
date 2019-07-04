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
        const {questions} = this.state;
        if (questions === null) {
        return <p>Loading ...</p>;
        }
        return (
            <div className="questions-container">
            {
                questions.map(question => {
                    return <Question 
                                key={question._id} 
                                _id={question._id}
                                title={question.title}
                                description={question.description}
                                answers={question.answers.length}
                            /> 
                })
            }
            </div>
        )
    }
}

