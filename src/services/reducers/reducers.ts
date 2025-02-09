import { combineReducers } from 'redux';
import { usersReducer } from './users/slice';

export const modelReducers = combineReducers({
    users: usersReducer,
});

export const rootReducer = {
    model: modelReducers,
};
