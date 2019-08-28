import {LIST_ACTIONS} from '../consts/action_types';

export const selectChannel = channelId => ({
  type: LIST_ACTIONS.SELECT_CHANNEL,
  channelId,
});

export const setChannelsList = channels => ({
  type: LIST_ACTIONS.SET_CHANNELS_LIST,
  channels,
});

export const loadChannelMessages = (channelId, messages) => ({
  type: LIST_ACTIONS.POPULATE_CHANNEL_WITH_MESSAGES,
  messages,
  channelId,
});

export const addMessage = (channelId, message) => ({
  type: LIST_ACTIONS.ADD_MESSAGE,
  channelId,
  message
});
