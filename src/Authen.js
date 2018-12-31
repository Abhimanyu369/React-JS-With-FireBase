import React, {Component} from 'react';
var firebase = require('firebase');

 var config = {
     apiKey: "AIzaSyB6K5AL0k2Q5SthB6dAY3ZGFnrhaia6mio",
     authDomain: "fir-login-2208b.firebaseapp.com",
     databaseURL: "https://fir-login-2208b.firebaseio.com",
     projectId: "fir-login-2208b",
     storageBucket: "fir-login-2208b.appspot.com",
     messagingSenderId: "765544197319"
   };
   firebase.initializeApp(config);

class Authen extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    //console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user =>{
      var err = "Welcome "+ user.user.email + ". You are logged in.";
      var lout = document.getElementById('logout');
      lout.classList.remove('hide');
      this.setState({err: err});
    });

    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }

  signup(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    //console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var err = "Welcome "+ user.user.email;
      firebase.database().ref('users/'+ user.user.uid).set({
        email: user.user.email
      });
      console.log(user);
      this.setState({err: err});
    });
    promise
    .catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }

  logout(event){
    const promise = firebase.auth().signOut();
    var lout = document.getElementById('logout');
    lout.classList.add('hide');

    promise.then(user =>{
      var err = "Successfully logged out. Thank You for using our App";
      this.setState({err: err});
    });
  }

  google(){
    var provider = new firebase.auth.GoogleAuthProvider();

    var promise = firebase.auth().signInWithPopup(provider);

    promise.then(result => {
      var user = result.user;
      console.log(result);

      firebase.database().ref('users/'+ user.uid).set({
        email: user.email,
        name: user.displayName
      });

    });

    promise
    .catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });

  }

  constructor(props){
    super(props);

    this.state = {
      err: '',
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }
  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter Your Email" /><br />
        <input id="pass" ref="password" type="password" placeholder="Enter Your Password" /><br />
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button id="logout" className="hide" onClick={this.logout}>Log Out</button><br />
        <button id="logout" className="" onClick={this.google}>Sign In with Google</button>
      </div>
    );
  }
}

export default Authen;
