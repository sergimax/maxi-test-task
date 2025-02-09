import { createSlice } from '@reduxjs/toolkit';
import { USERS_STATE_NAME } from './constants';

const initialState: any = {
    users: [],
};

const usersSlice = createSlice({
    name: USERS_STATE_NAME,
    initialState,
    reducers: {},
    // extraReducers(builder) {
    // }
});

export const usersReducer = usersSlice.reducer;
