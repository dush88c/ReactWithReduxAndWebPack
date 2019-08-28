import {LIST_ACTIONS} from '../consts/action_types';

const channel = (state = {}, action) => {
  switch (action.type) {
    case LIST_ACTIONS.SELECT_CHANNEL:
      return {
        ...state,
        selectedChannelId: action.channelId
      };
    case LIST_ACTIONS.SET_CHANNELS_LIST:
      return {
        ...state,
        channels: action.channels,
      };
    case LIST_ACTIONS.POPULATE_CHANNEL_WITH_MESSAGES:
      return {
        ...state,
        messages: {
          [action.channelId]: action.messages
        }
      };
    case LIST_ACTIONS.ADD_MESSAGE:      
      const updatedMessages = action.message;

      return {
        ...state,
        messages: {
          [action.channelId]: updatedMessages
        }
      };
    default:
      return state;
  }
};

export default channel;
