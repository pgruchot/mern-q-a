import React, { Component } from 'react'
import axios from 'axios';

export default class QuestionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            question: null,
        }
    }

    async componentDidMount() {
        console.log('here')
        const { match: { params } } = this.props;
        console.log(this.props)
        const question = (await axios.get(`/questions/${params.questionId}`)).data.question;    
        this.setState({
            question
        });
    }

    render() {
        const {question} = this.state;
        if (question === null) {
        return <p>Loading ...</p>;
        }
        return (
            <div className="container">
                <div className="row">
                     <div className="col s12 m6 l6">
                         <div className="card medium">
                             <div className="card-image">
                                 <div className="card-background"></div>
                                 <span className="card-title">{question.title}</span>
                             </div>
                             <div className="card-content">
                                 <p>{ question.description }</p>
                             </div>
                             <div className="card-action">
                                 Answers: 
                                 {question.answers.map((answer, idx) => {
                                     
                                     return <p key={idx}> {answer} </p>
                                 })}
                            </div>
                         </div>
                     </div>
                 </div>
             </div>
        )
}
}
