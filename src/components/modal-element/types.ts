import { JSX } from 'react';

export type ModalElementProps = {
  title?: string; children: JSX.Element; onClose: (message?: string) => void;
};
