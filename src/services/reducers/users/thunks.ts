import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINT, API_URL, USERS_STATE_NAME } from './constants';
import { FetchUsersAsyncThunkConfig, GetUsersDTO } from './types';

export const fetchUsers = createAsyncThunk<
    GetUsersDTO,
    void,
    FetchUsersAsyncThunkConfig
>(`${USERS_STATE_NAME}/fetch`, async (_, { rejectWithValue }) => {
    try {
        const usersResponse = await fetch(`${API_URL}/${API_ENDPOINT.USERS}`);

        if (!usersResponse.ok) {
            throw new Error('Users fetch failed');
        }

        const usersData: GetUsersDTO = await usersResponse.json();

        if (!usersData.length) {
            throw new Error('Empty users list');
        }

        console.log('usersData', usersData);

        return usersData;
    } catch (error) {
        console.error('error: ', error);

        return rejectWithValue(error as string);
    }
});
