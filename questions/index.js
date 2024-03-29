const express = require('express');
const router = express.Router();
const Question = require('../models/questions');

//get all the questions for main page
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

//getting specific question for the single question page
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

//post question
router.post('/', (req, res) => {
    const {title, description, author} = req.body;
    const newQuestion = new Question({
        title,
        description,
        author,
        answers: []
    });
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

//post answer to specific question
router.post('/answer/:id', (req, res) => {
    const {answer, author} = req.body;
    //const author = req.user.local.username;
    Question.findOneAndUpdate({ '_id': req.params.id },  {$push: {'answers': {answer, author}}}, (err, question) => {
        if(err) {
            console.log('Error while looking for question in db')
            res.json({
                'errors': {db: `Error while looking for question in db ${err}`}
            });
        };
        console.log(question);
        res.json({
            'errors': ''
        })
    })
})

module.exports = router;