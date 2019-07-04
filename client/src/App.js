import React from 'react';
import './App.css';
import Header from './components/Header';
import Questions from './components/Questions';
import Question from './components/QuestionPage';
import { Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />  
        <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        <Route exact path='/login' component={Login}/>
        
      </AuthProvider>
    </div>
  );
}

export default App;
