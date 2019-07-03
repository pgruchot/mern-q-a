import React from 'react';
import './App.css';
import Header from './components/Header';
import Questions from './components/Questions';
import Question from './components/QuestionPage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />  
      <Route exact path='/' component={Questions}/>
      <Route exact path='/question/:questionId' component={Question}/>
    </div>
  );
}

export default App;
