import { combineReducers } from 'redux';
import channel from './channel';

const rootReducer = combineReducers({
  channel, // shorthand for channelMessage: channelMessage
});

export default rootReducer;
