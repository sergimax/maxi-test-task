import { JSX, useEffect, useState } from 'react';
import './app.css';
import { useAppDispatch, useAppSelector } from './services/hooks';
import { fetchUsers } from './services/reducers/users/thunks';
import {
    usersIsLoadedSelector,
    // usersIsLoadingSelector,
    usersSelector,
} from './services/reducers/users/selectors';
import { UsersTable } from './components/users-table';
import { Modal } from './components/modal';
import { ModalContent } from './types/types';

function App() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(usersSelector);
    // const isLoading = useAppSelector(usersIsLoadingSelector);
    const isLoaded = useAppSelector(usersIsLoadedSelector);

    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const [modalData, setModalData] = useState<ModalContent | null>(null);

    const closeModal = () => {
        setIsModalShown(false);
    };

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
            {isModalShown && modalData && (
                <Modal
                    title={modalData.title}
                    children={modalData.content}
                    onClose={closeModal}
                />
            )}
        </>
    );
}

export default App;
