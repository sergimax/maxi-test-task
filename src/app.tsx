import { useEffect, useState } from 'react';
import './app.css';
import { useAppDispatch, useAppSelector } from './services/hooks';
import { fetchUsers } from './services/reducers/users/thunks';
import {
    usersIsLoadedSelector
} from './services/reducers/users/selectors';
import { UsersTable } from './components/users-table';
import { ModalElement } from './components/modal-element';
import { DataForModal } from './types/types';
import { MODAL_TYPE } from './constants/constants';
import Snackbar from '@mui/material/Snackbar';

function App() {
    const dispatch = useAppDispatch();
    const isLoaded = useAppSelector(usersIsLoadedSelector);

    const [isModalShown, setIsModalShown] = useState<boolean>(false);
    const [modalData, setModalData] = useState<DataForModal | null>(null);

    const [isSnackbarShown, setIsSnackbarShown] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("null");

    const closeModal = (message?: string) => {
        setIsModalShown(false);
        if (message?.length) {
            setSnackbarMessage(message)
            setIsSnackbarShown(true);
        }
    };

    const openModal = (data: DataForModal): void => {
        if (data.type === MODAL_TYPE.DELETE_USER) {
            console.log("MODAL_TYPE.DELETE_USER");
            setModalData(data);
            setIsModalShown(true);
        }

        if (data.type === MODAL_TYPE.CREATE_USER) {
            console.log("MODAL_TYPE.CREATE_USER");
            setModalData(data);
            setIsModalShown(true);
        }
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
            {isLoaded && (
                <UsersTable
                    caption="Users list"
                    onDeleteUser={openModal}
                    onAddUser={openModal}
                    onModalClose={closeModal}
                ></UsersTable>
            )}
            {isModalShown && modalData && (
                <ModalElement
                    title={modalData.title}
                    children={modalData.content}
                    onAccept={modalData.onAccept}
                    onClose={closeModal}
                />
            )}

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={isSnackbarShown}
              autoHideDuration={2000}
              onClose={() => setIsSnackbarShown(false)}
              message={snackbarMessage}
            />
        </>
    );
}

export default App;
