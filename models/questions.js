const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: { type: String, unique: false },
    description: { type: String, unique: false },
    author: { type: String, required: true},
    answers: []
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
