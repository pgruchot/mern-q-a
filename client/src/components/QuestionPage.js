import React, { Component } from 'react'
import axios from 'axios'
import rollColor from './RollColor'
import AddAnswer from './AddAnswer'

export default class QuestionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            question: null,
            answer: ''
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const question = (await axios.get(`/questions/${params.questionId}`)).data.question;    
        this.setState({
            question
        });
    }

    render() {
        const { question } = this.state
        const { match: { params } } = this.props
        if (question === null) {
        return <p>Loading ...</p>
        }
        return (
            <div className="question-card-container-single-page">
                     <div className="col s12 m8 l8">
                         <div className="card single-page-card-size">
                             <div className="card-image">
                                 <div className={"card-background " + rollColor()}></div>
                                 <span className="card-title">{question.author}<br></br>{question.title}</span>
                             </div>
                             <div className="card-content">
                                 <p>{ question.description }</p>
                             </div>
                             <div className="card-action">
                                 <div>
                                    Answers: 
                                    {question.answers.map((answerObj, idx) => {
                                        return <p key={idx}><span>{answerObj.author}</span> {answerObj.answer} </p>
                                    })}
                                 </div>
                                 <div>
                                    Post your own idea!
                                    <AddAnswer questionId={params.questionId} />
                                </div>
                            </div>
                         </div>
                     </div>
             </div>
        )
}
}
