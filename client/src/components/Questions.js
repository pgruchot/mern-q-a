import React, { Component } from 'react'
import Question from './QuestionCard'
import axios from 'axios'
import rollColor from './RollColor'

//component rendering questions container and question cards
export default class Questions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: null
        }
    } 

    componentDidMount() {
        axios.get('/questions/').then(response => {
            this.setState({
                questions: response.data.questions
            })
        })
    }
   
    render() {
        const {questions} = this.state
        const questionsList = questions ? (
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
            </div>) : (
            <p>Loading ...</p>
            )
       return (
           questionsList
       )
    }
}

