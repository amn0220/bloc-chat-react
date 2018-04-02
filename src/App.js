import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
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
  render() {
    return (
      <div className="App">
      <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
