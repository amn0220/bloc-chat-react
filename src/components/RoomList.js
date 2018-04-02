import React, { Component } from 'react';
import './../App.css';

class RoomList extends Component {
    constructor (props){
      super (props)

      this.state = {
          rooms: [],
          newRoomName: ''
        };
      this.handleChange =this.handleChange.bind(this);
      this.roomsRef = this.props.firebase.database().ref('rooms');
    };


    componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
   }

   handleChange(e){
     this.setState({ newRoomName: e.target.value });
   }

   handleSubmit(e) {
      e.preventDefault();
     alert('A new chat room was created');
   }

   createChatRoom() {
        this.roomsRef.push({ name: this.state.newRoomName});
  }

  render() {
      return (
        <div className='room-list'>
        <h1>Rooms</h1>
        <ul>
        {this.state.rooms.map( (room, index) => {
          return (
            <li key={index}>{room.name}</li>
          )
        })}
        </ul>
        <div className='create-room'>
          <form className='form' onSubmit={this.handleSubmit}>
           <fieldset>
            <legend>Create Chat Room</legend>
            <input type='text'placeholder='enter chat room name' value={this.state.newRoomName} onChange={(e) => this.handleChange(e)}/>
            <button type ='submit' onClick={() => this.createChatRoom()}>Add</button>
           </fieldset>
          </form>
        </div>
      </div>
      );
    }
}

export default RoomList;
