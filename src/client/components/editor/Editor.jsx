import React from 'react';
import axious from 'axios';
import { addMessage } from "../../actions/list_actions";
import { connect } from "react-redux";
import  './editor.css';

const mapStateToProps = (state) => {
  return {
    selectedChannelId: state.channel.selectedChannelId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (channelId, message) => dispatch(addMessage(channelId, message)),
  };
};

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  sendMessage =(event)=> {
    event.preventDefault();
    axious.post(`/api/${this.props.selectedChannelId}`, { newMessage: this.state.newMessage })
      .then((response) => {
        this.setState({
          newMessage: ''
        });
        this.props.updateMessages(this.props.selectedChannelId, response.data);
      }).catch((ex)=>console.log(ex));
  }

  handleChange=(event)=> {
    this.setState({
      newMessage: event.target.value
    })
  }

  render() {
    return (
      <form onSubmit={ this.sendMessage}>
        <textarea onChange={this.handleChange} value={this.state.newMessage} className ="form-control textarea-align"  rows="4"  />
        <button disabled={!this.props.selectedChannelId || !this.state.newMessage} className = "submit-btn btn btn-success btn-lg" type="submit">Send</button>
      </form>
    )
  }
}

Editor = connect(mapStateToProps, mapDispatchToProps)(Editor);

export default Editor;
