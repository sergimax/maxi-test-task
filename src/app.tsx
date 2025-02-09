import { useEffect } from 'react';
import './app.css';
import { useAppDispatch, useAppSelector } from './services/hooks';
import { fetchUsers } from './services/reducers/users/thunks';
import {
    usersIsLoadedSelector,
    // usersIsLoadingSelector,
    usersSelector,
} from './services/reducers/users/selectors';
import { UsersTable } from './components/users-table';

function App() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(usersSelector);
    // const isLoading = useAppSelector(usersIsLoadingSelector);
    const isLoaded = useAppSelector(usersIsLoadedSelector);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
            <h1>Hello there!</h1>
            {isLoaded && (
                <UsersTable
                    usersList={users}
                    caption="Users list"
                ></UsersTable>
            )}
        </>
    );
}

export default App;
