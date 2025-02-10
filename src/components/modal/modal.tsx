import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay';
import { useEffect } from 'react';
import { ModalProps } from './types';
import styles from './style.module.scss';

export const Modal = ({ onClose, children, onAccept }: ModalProps) => {
    const modalClasses: string = `${styles.container}`;

    function handleEscapeKeyPress(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKeyPress, false);

        return () => {
            document.removeEventListener(
                'keydown',
                handleEscapeKeyPress,
                false
            );
        };
    }, []);

    return createPortal(
        <>
            <div className={modalClasses}>
                <div>{children}</div>
                {onAccept && (
                    <button
                        onClick={() => {
                            onAccept();
                            onClose();
                        }}
                    >
                        Yes
                    </button>
                )}
            </div>
            <ModalOverlay onClose={onClose} />
        </>,
        document.body
    );
};
