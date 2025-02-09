import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINT, API_URL, USERS_STATE_NAME } from './constants';

export const fetchUsers = createAsyncThunk(
    `${USERS_STATE_NAME}/fetch`,
    async (_, { rejectValue }) => {
        try {
            const usersResponse = await fetch(
                `${API_URL}/${API_ENDPOINT.USERS}`
            );
            console.log('usersResponse', usersResponse);
        } catch (error) {
            console.error('error: ', error);
        }
    }
);
