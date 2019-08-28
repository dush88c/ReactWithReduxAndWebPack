import React, { Component } from 'react';
import axious from 'axios';
import { connect } from 'react-redux';
import { loadChannelMessages } from '../../actions/list_actions';
import Message from './Message';

const mapStateToProps = (state) => {
  return {
    selectedChannelId: state.channel.selectedChannelId,
    messages: state.channel.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessages: (channelId, messages) => dispatch(loadChannelMessages(channelId, messages)),
  };
};

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channelId: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedChannelId } = nextProps;

    if (!selectedChannelId || this.state.channelId === selectedChannelId) return;

    axious.get(`/api/messages/${selectedChannelId}`)
      .then((response) => {
        this.props.updateMessages(selectedChannelId, response.data);
      });

    this.setState({
      channelId: selectedChannelId
    })
  }

  render() {
    const { messages, selectedChannelId } = this.props;

    if (!selectedChannelId || !messages) return null;

    const activeChannelMessages = messages[selectedChannelId];

    return (
      <div className="message-section">
        {(activeChannelMessages && activeChannelMessages.length> 0) ? <label> Message History</label> : ""}
        <ul className ="list-group list-group-flush">
          
        {activeChannelMessages && activeChannelMessages.map((message, i) => <Message key={i} text={message}/> )}
        </ul>
      </div>
    );
  }
}

MessageList = connect(mapStateToProps, mapDispatchToProps)(MessageList);

export default MessageList;
