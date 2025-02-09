import { JSX } from 'react';

export type ModalProps = {
    title?: string;
    children: JSX.Element;
    onAccept?: () => void;
    onClose: () => void;
};
