import { UserAvatarProps } from "./types.ts";
import styles from './style.module.scss';

export const UserAvatar = ({ name }: UserAvatarProps) => {
  const letter = name ? name.charAt(0).toUpperCase() : '';

  return (<div className={styles.avatar}>
    {letter}
  </div>);
}
