import React from 'react'
import './App.css'
import Header from './components/Header'
import Questions from './components/Questions'
import Question from './components/QuestionPage'
import { Route } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import Login from './components/login'
import Signup from './components/Signup'
import AddQuestion from './components/AddQuestion'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />  
        <Route exact path='/' render={props =>
          <div>
            <Questions />
            <AddQuestion />
          </div>
        } />
        <Route exact path='/question/:questionId' component={Question}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        
      </AuthProvider>
    </div>
  );
}

export default App;
