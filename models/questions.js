const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: { type: String, unique: false },
    description: { type: String, unique: false },
    answers: []
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
