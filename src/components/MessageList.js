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
    };

    componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) });
     });
    }

    handleChange(e){
      this.setState({
        username: this.props.user,
        content: e.target.value,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoomName});
    }

    handleSubmit(e){
      e.preventDefault(e);
       if (!this.state.content) {return}
    }

    createMessage(e) {
      e.preventDefault();
      this.messagesRef.push({
        username: this.state.username,
        content: this.state.content,
        sentAt: this.state.sentAt,
        roomId: this.props.activeRoomName});
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
      <div className='chatroom-messages'>
       <div>{messageList}</div>
       <form className='new-messages' onSubmit={(e) => this.handleSubmit(e)}>
         <legend>Create New Message</legend>
         <input type='text'placeholder='enter new message' value={this.state.content} onChange={(e) => this.handleChange(e)}/>
         <button type ='submit' onClick={(e) => this.createMessage(e)}>Send</button>
       </form>
      </div>
    );
    }
}

export default MessageList;
