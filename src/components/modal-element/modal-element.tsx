import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay';
import { useEffect } from 'react';
import { ModalElementProps } from './types';
import styles from './style.module.scss';

export const ModalElement = ({ onClose, children }: ModalElementProps) => {
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

  return createPortal(<>
    <div className={modalClasses}>
      {children}
    </div>
    <ModalOverlay onClose={onClose} />
  </>, document.body);
};
