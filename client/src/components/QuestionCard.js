import React from 'react'
import { Link } from 'react-router-dom';

//component used to present a single card in container
export default function QuestionCard( {_id, title, description, author, answers, color}) {
    return (
        <div className="question-card-container">
                    <div className="card medium blue-grey lighten-5">
                        <div className="card-image">
                            <div className={"card-background " + color}></div>
                            <span className="card-title">{author}<br></br>{title}</span>
                        </div>
                        <div className="card-content">
                            <p>{ description }</p>
                        </div>
                        <div className="card-action">
                            <Link to={`/question/${_id}`}>Answers: {answers}</Link>
                        </div>
                    </div>
        </div>
    )
}
