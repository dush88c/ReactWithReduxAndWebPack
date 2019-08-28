import React from 'react';
import ChannelList from '../channels/ChannelList';
import MessageList from '../messages/MessageList';
import Editor from '../editor/Editor';

const Home = () => (
  <div className="message-board">
        <ChannelList/>
        <MessageList/>
        <Editor/>
  </div>
);

export default Home;
