import { JSX } from 'react';

export type ModalProps = {
    title?: string;
    children: JSX.Element;
    onClose: (message?: string) => void;
};
