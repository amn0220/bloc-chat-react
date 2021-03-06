import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User/User'
import './App.css';


var config = {
    apiKey: "AIzaSyAFufmP9u0dwocI9GpnLbYacJ9l4tPu-n8",
    authDomain: "bloc-chat-react-4a4db.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-4a4db.firebaseio.com",
    projectId: "bloc-chat-react-4a4db",
    storageBucket: "bloc-chat-react-4a4db.appspot.com",
    messagingSenderId: "588448652818"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      activeRoomName: '',
      user: null
    };
  }

setActiveRoom(room){
  this.setState({ activeRoomName: room})
}

setUser(user){
  this.setState({ user: user })
}

render() {
    const showMessages = this.state.activeRoomName;
    const currentUser = this.state.user === null ? 'Guest' : this.state.user.displayName;

    return (
      <div className='App'>
      <h1 className='app-title'>Bloc Chat</h1>
      <User firebase={firebase} setUser={this.setUser.bind(this)} currentUser={currentUser}/>
      <RoomList firebase={firebase} activeRoomName={this.setActiveRoom.bind(this)}/>
      <div className='active-room'>
      <h2>{this.state.activeRoomName.name}</h2>
      {showMessages ? (<MessageList firebase={firebase} activeRoomName={this.state.activeRoomName.key} user={currentUser}/>) : (null)}
      </div>
      </div>
    );
  };
}

export default App;
