import React from 'react'
import { Link } from 'react-router-dom';

export default function QuestionCard( {_id, title, description, answers}) {
    return (
        <div className="question-card-container">
                    <div className="card medium">
                        <div className="card-image">
                            <div className="card-background"></div>
                            <span className="card-title">{title}</span>
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
