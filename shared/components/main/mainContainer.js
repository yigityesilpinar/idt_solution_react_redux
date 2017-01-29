import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as allActions from '../../actions/';
import io from "socket.io-client";
import client from "./client";
/* eslint-disable no-console */

let userCount= 0;
class mainContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
          log: [],
          users: [],
          connectedUsers:{},
          socket: io.connect()
        };
    }


  componentDidMount() {
    let {socket} = this.state;
    client(socket);
  } // end of componentDidMount

  componentDidUpdate(prevProps, prevState){

    let currentClientSocketId = this.state.socket.id;
    let messageSocketId = this.props.socket.id;

  }
  /*
  sendMessage(event){
    event.preventDefault();
    let {actions} = this.props;
    let {socket} = this.state;
    let message_input=  document.getElementById('message_input');
    if (message_input.value) {

      actions.sendMessage(socket, message_input.value);
      message_input.value = "";
    }

  }
  */
  render(){


        return (
          <div  ref="main_container" className="main-container">
            <div className="row">
              Welcome to the Chat App <span id="user_span">&nbsp;</span>!
            </div>

            {/* Container for chat messages */}
            <div className="message-container">
              <ul id="message_container" className="dynamic-container">&nbsp;</ul>
            </div>

            {/* Container for list of users */}
            <div className="user-list">
              <ul id="user_list" className="dynamic-container">
              </ul>
            </div>

            {/* Container for Send Message */}
            <div className="write-div">
              <div className="change-row">
                Message box:
              </div>
              <input id="message_input" placeholder="Write your message here..." autoComplete="off" />

              <a className="button" id="message_send" >
                <span>Send</span>
              </a>

            </div>

            {/* Container for Change Username */}
            <div className="change-div">
              <div className="change-row">
                Your user name:"
              </div>
              <input id="user_name" autoComplete="off"/>
              <a className="button" id="change_name">
                <span>Change</span>
              </a>
            </div>
          </div>
        );
    }
}

mainContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    socket: PropTypes.object
};



function mapStateToProps(state, ownProps) {
  const {chatState} = state;
  return {
    users: chatState.userList,
    log: chatState.log,
    socket: chatState.socket,
    message:chatState.props
  };
}

function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(allActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(mainContainer);
