import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../../Styles/Chat.css";

import axios from "axios";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messages: [],
      match: "",
    };

    this.props.socket.on("RECEIVE_MESSAGE", function (data) {
      addMessage(data);
    });

    const addMessage = (data) => {
      this.setState({ messages: [...this.state.messages, data] });
    };

    this.sendMessage = (ev) => {
      ev.preventDefault();

      let newMessage = {
        room: this.props.room,
        content: {
          author: this.props.user,
          message: this.state.message,
        },
      };
      this.props.socket.emit("SEND_MESSAGE", newMessage);
      this.setState({ messages: [...this.state.messages, newMessage.content] });
      axios.post(
        process.env.REACT_APP_API_URL + "chat/insertmessages",
        newMessage
      );
      this.setState({ message: "" });
    };
  }

  eraseMessages() {
    this.setState({ messages: [] });
  }

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_API_URL + `chat/getmessages/${this.props.room}`
      )
      .then((res) => {
        res.data.map((message) => {
          let messageContent = {
            message: message.message,
            author: message.usersent,
          };
          this.setState({ messages: [...this.state.messages, messageContent] });
        });
      });
  }

  render() {
    return (
      // <div className="chat">
      <>
        {/* <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={(ev) => this.setState({ username: ev.target.value })}
        /> */}
        <ScrollToBottom className="chatMessages">
          {/* <ScrollToBottom> */}
          {this.state.messages.map((message) => {
            return (
              <>
                {message.author == this.props.user ? (
                  <div className="chatMessageContainer" id="sentByUser">
                    <div className="messageSent">
                      <p>
                        {message.author}: {message.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="chatMessageContainer" id="sentByOther">
                    <div className="messageSent">
                      <p>
                        {message.author}: {message.message}
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })}
          {/* </ScrollToBottom> */}
        </ScrollToBottom>

        <div className="chatInputs">
          <input
            type="text"
            placeholder="Message"
            value={this.state.message}
            onChange={(ev) => this.setState({ message: ev.target.value })}
          />
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </>
      // {/* </div> */}
    );
  }
}

export default Chat;
