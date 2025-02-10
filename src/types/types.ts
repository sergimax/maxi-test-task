import { JSX } from 'react';
import { MODAL_TYPE } from '../constants/constants';

export type DataForModal = {
    title?: string;
    content: JSX.Element;
    type: MODAL_TYPE.CREATE_USER | MODAL_TYPE.DELETE_USER;
    onAccept?: () => void;
};
