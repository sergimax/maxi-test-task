import { useEffect } from 'react';
import './app.css';
import { useAppDispatch } from './services/hooks';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('APP');
    }, [dispatch]);

    return <> Hello there!</>;
}

export default App;
