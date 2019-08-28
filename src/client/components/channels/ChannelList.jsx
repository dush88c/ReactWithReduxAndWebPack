import React, { Component } from 'react';
import axious from 'axios';
import { connect } from 'react-redux';
import { setChannelsList, selectChannel } from '../../actions/list_actions';
import Channel from './Channel';

const mapStateToProps = (state) => {
  return {
    channels: state.channel.channels,
    selectedChannelId: state.channel.selectedChannelId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setChannelsList: channelsList => dispatch(setChannelsList(channelsList)),
    selectChannel: channelId => dispatch(selectChannel(channelId)),
  };
};

class ChannelList extends Component {

  componentWillMount() {
    
    axious.get(`/api/channels`).catch((ex)=> {console.log(ex)})
      .then((response) => {
        this.props.setChannelsList(response.data);
      });
  }

  selectChannel=(channelId)=>{
    this.props.selectChannel(channelId);

  }

  render() {
    const { channels, selectedChannelId } = this.props;

    return (     
        <div className ="list-group">
        {channels && channels.map(({ id, name }, i) => <Channel isSelected={selectedChannelId === id}
          id={id}
          handleClick={()=>this.selectChannel(id)}
          name={name} />)}
          </div>
              );
  }
}

ChannelList = connect(mapStateToProps, mapDispatchToProps)(ChannelList);

export default ChannelList;
