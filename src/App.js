import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
      activeRoomName: ''
    };
  }
setActiveRoom(room){
  this.setState({ activeRoomName: room})
}

  render() {
    const showMessages = this.state.activeRoomName;

    return (
      <div className='App'>
      <RoomList firebase={firebase} activeRoomName={this.setActiveRoom.bind(this)}/>
      <div className='active-room'>
      <h1>{this.state.activeRoomName.name}</h1>
      {showMessages ? (<MessageList firebase={firebase} activeRoomName={this.state.activeRoomName.key}/>) : (null)}
      </div>
      </div>
    );
  };
}

export default App;
