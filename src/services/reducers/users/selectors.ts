import { AppState } from '../../store';

const rootSelector = (state: AppState) => state.model.users;

export const usersIsLoadedSelector = (state: AppState) => rootSelector(state).isLoaded;
export const usersIsLoadingSelector = (state: AppState) => rootSelector(state).isLoading;
export const usersErrorSelector = (state: AppState) => rootSelector(state).error;
export const usersSelector = (state: AppState) => rootSelector(state).users;
