import styles from './style.module.scss';
import { ModalOverlayProps } from './types';

export const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
  return (<div
      className={styles.overlay}
      onClick={onClose}
    />);
};
