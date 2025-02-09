import { useEffect } from 'react';
import './app.css';
import { useAppDispatch } from './services/hooks';
import { fetchUsers } from './services/reducers/users/thunks';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('APP');
        dispatch(fetchUsers());
    }, [dispatch]);

    return <> Hello there!</>;
}

export default App;
