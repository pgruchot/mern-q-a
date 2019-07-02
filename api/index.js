const express = require('express');
const router = express.Router();
const Question = require('../models/questions');

router.get('/', (req, res) => {
    Question.find({}, (err, questions) => {
        if(err) {
            console.log('error retrieving questions from db');
            return res.json({
                'errors': {db: `Error while looking for questions in db ${err}`}
            });
        }
        if(questions) {
            return res.json({
                questions
            });
        };
    });
});

router.get('/:id', (req, res) => {
    Question.findOne({ '_id': req.params.id }, (err, question) => {
        if(err) {
            console.log('error while searching for particular question from db');
            return res.json({
                'errors': {db: `Error while searching for question in db ${err}`}
            });
        };
        if(question) {
            return res.json({
                question
            });
        };
    });
});

router.post('/', (req, res) => {
    const {title, description} = req.body;
    const newQuestion = new Question({
        title,
        description,
        answers: []
    });
    console.log('gettng here')
    newQuestion.save((err) => {
        if(err) {
            console.log('Error while saving new question');
            return res.json({
                'errors': {db: `Error while saving question to db ${err}`}
            });
        }

        return res.json({
            'errors': ''
        });

    });
});

router.post('/answer/:id', (req, res) => {
    const {answer} = req.body;
    Question.findOneAndUpdate({ '_id': req.params.id },  {$push: {'answers': answer}}, (err, question) => {
        if(err) {
            console.log('Error while looking for question in db')
            res.json({
                'errors': {db: `Error while looking for question in db ${err}`}
            });
        };
        console.log(question);
        res.status(200).send();
    })
})

module.exports = router;