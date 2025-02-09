import { JSX } from 'react';
import { MODAL_TYPE } from '../constants/constants';

export type ModalContent = {
    title?: string;
    content: JSX.Element;
};

export type ModalType = keyof typeof MODAL_TYPE;

export type DataForModal = ModalContent & {
    type: ModalType;
    onAccept: () => void;
};
