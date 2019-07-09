import React, { Component } from 'react'
import Question from './QuestionCard'
import axios from 'axios'
import rollColor from './RollColor'

export default class Questions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: null
        }
    } 

    async componentDidMount() {
        const questions = (await axios.get('/questions/')).data.questions;
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
                        const color = rollColor()
                        return <Question 
                                    key={question._id} 
                                    _id={question._id}
                                    title={question.title}
                                    description={question.description}
                                    author={question.author}
                                    answers={question.answers.length}
                                    color={color}
                                /> 
                    })
                }
                </div>
        )
    }
}

