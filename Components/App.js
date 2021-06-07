import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import '../App.css';
import '../styles.css';
import Login from './Login';
import Nav from './Nav';
import RecipeSearchForm from './RecipeSearchForm';
import GroceryList from './GroceryList';
import firebase from '../firebase';

class App extends Component {

  // set initial state

  state = {
    isAuthenticated: false
  }

  // onLogin() gets authentication information from firebase and signs user in

  onSignUp = (email, password) => {
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {this.setState({isAuthenticated: true})})
    .catch(error => console.log(error))
  };

  onLogin = (email, password) => {
    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {this.setState({isAuthenticated: true})})
    .catch(error => console.log(error));
  };

  onLogout = () => {
    firebase.auth()
    .signOut()
    .then(() => {
      this.setState({isAuthenticated: false})
    })
    .catch(error => console.log(error));
  };

  render() {
    return (
      <Router>
        <>
          <Nav isAuthenticated={this.state.isAuthenticated} onlogout={this.onLogout} />
          <Switch>
            <Route exact path={['/', '/recipes', '/recipes/:recipeId']} component={RecipeSearchForm} />
            <Route exact path='/login' render={() => !this.state.isAuthenticated ? <Login onLogin={this.onLogin} onSignUp={this.onSignUp} /> : <Redirect to='/' />} />
            <Route path='/lists/grocery-list' component={GroceryList} />
          </Switch>
        </>
      </Router>
    );
  }
}


export default App;
