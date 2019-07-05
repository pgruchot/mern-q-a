import React, { Component } from 'react'
import Question from './QuestionCard'
import axios from 'axios'

export default class Questions extends Component {
    constructor(props) {
        super(props)

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
    rollColor() {
        let color = ''
        let rand = Math.floor(1 + Math.random() * (4))
        console.log(rand)
        switch(rand){
            case 1:
                color = 'grad1'
                break
            case 2:
                color = 'grad2'
                break
            case 3:
                color = 'grad3'
                break
            case 4:
                color = 'grad4'
                break
        }
        return color
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
                        const color = this.rollColor()
                        return <Question 
                                    key={question._id} 
                                    _id={question._id}
                                    title={question.title}
                                    description={question.description}
                                    answers={question.answers.length}
                                    color={color}
                                /> 
                    })
                }
                </div>
        )
    }
}

