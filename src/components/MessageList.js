import React, { Component } from 'react';
import './../App.css';

class MessageList extends Component {
    constructor (props){
      super (props)

      this.state = {
        messages: [{
          username: '',
          content: '',
          sentAt: '',
          roomId: ''}]
        };
      this.messagesRef = this.props.firebase.database().ref('messages');
      this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
    };
    componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) });
     });
    }
    render(){
      const activeRoomName = this.props.activeRoomName;
      const messageList = this.state.messages
      .filter(message => message.roomId === activeRoomName)
      .map(message => {
        return <div className='message-info'><p key={message.key}>{message.content}</p>
        <p>{message.username}</p><p>{message.sentAt}</p>
        </div>
      })
      return (
      <div className='all-messages'>
       <ul>{messageList}</ul>
      </div>
    );
    }
}

export default MessageList;
