import React, { Component } from 'react';

class User extends Component{
  constructor(props){
   super (props)

   this.signIn = this.signIn.bind(this);
   this.signOut = this.signOut.bind(this);
 }

signIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
}

signOut() {
  this.props.firebase.auth().signOut();
  this.props.setUser('Guest');
}

componentDidMount() {
this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
  });
}

render(){
  return (
    <div className='welcome-user'>
      <h1>Hello, {this.props.currentUser}. Welcome to Bloc-Chat!</h1>
        <button className='sign-in' onClick={() => this.signIn()}> Sign in</button>
        <button className='sign-out' onClick={() => this.signOut()}> Sign out</button>
    </div>
  );
}
}
export default User;
