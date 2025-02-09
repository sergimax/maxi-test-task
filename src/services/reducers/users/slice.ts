import { createSlice } from '@reduxjs/toolkit';
import { USERS_STATE_NAME } from './constants';
import { fetchUsers } from './thunks';

const initialState: any = {
    users: [],
    isLoaded: false,
    isLoading: false,
    error: undefined,
};

const usersSlice = createSlice({
    name: USERS_STATE_NAME,
    initialState,
    reducers: {
        resetUsersState: () => initialState,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;

                state.users = action.payload.map((user) => {
                    return {
                        zipcode: user.address.zipcode,
                        ...user,
                    };
                });
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.error = action.payload;

                console.error('state.error:', state.error);
            });
    },
});

export const usersReducer = usersSlice.reducer;
