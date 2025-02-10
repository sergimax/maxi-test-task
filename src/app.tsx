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
import { DataForModal } from './types/types';
import { MODAL_TYPE } from './constants/constants';

function App() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(usersSelector);
    // const isLoading = useAppSelector(usersIsLoadingSelector);
    const isLoaded = useAppSelector(usersIsLoadedSelector);

    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const [modalData, setModalData] = useState<DataForModal | null>(null);

    const closeModal = () => {
        setIsModalShown(false);
    };

    const openModal = (data: DataForModal): void => {
        if (data.type === MODAL_TYPE.DELETE_USER) {
            console.log("MODAL_TYPE.DELETE_USER");
            setModalData(data);
            setIsModalShown(true);
        }

        // if (data.type === MODAL_TYPE.CREATE_USER) {
        //     console.log("MODAL_TYPE.CREATE_USER");
        // }
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
            {isLoaded && (
                <UsersTable
                    usersList={users}
                    caption="Users list"
                    onDeleteUser={openModal}
                ></UsersTable>
            )}
            {isModalShown && modalData && (
                <Modal
                    title={modalData.title}
                    children={modalData.content}
                    onAccept={modalData.onAccept}
                    onClose={closeModal}
                />
            )}
        </>
    );
}

export default App;
