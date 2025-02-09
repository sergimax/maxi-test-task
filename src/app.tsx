import { useEffect } from 'react';
import './app.css';
import { useAppDispatch, useAppSelector } from './services/hooks';
import { fetchUsers } from './services/reducers/users/thunks';
import {
    usersIsLoadedSelector,
    usersIsLoadingSelector,
    usersSelector,
} from './services/reducers/users/selectors';

function App() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(usersSelector);
    const isLoading = useAppSelector(usersIsLoadingSelector);
    const isLoaded = useAppSelector(usersIsLoadedSelector);

    useEffect(() => {
        console.log('APP');
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
            <h1>Hello there!</h1>
            <div>users:</div>
            {isLoaded && <div>{users[0].name}</div>}
        </>
    );
}

export default App;
