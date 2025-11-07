import { combineReducers } from 'redux';
import SampleReducer from './sampleRedux/reducer';
import Auth from './auth/reducer';
import Tasks from './tasks/reducer';

export default combineReducers({
    SampleReducer,
    Auth,
    Tasks
});
