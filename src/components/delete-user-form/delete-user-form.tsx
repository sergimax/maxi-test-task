import { Button, ButtonGroup } from "@mui/material";
import { DeleteUserFormProps } from "./types.ts";
import styles from './style.module.scss';

export const DeleteUserForm = ({ onDelete, onClose }: DeleteUserFormProps) => {
  return <div className={styles["delete-user-form-container"]}>
    <h2>Delete selected users?</h2>

    <ButtonGroup variant="contained" className={styles["delete-user-form-container__buttons"]}>
      <Button variant="contained" onClick={() => {
        onDelete();
        onClose("Selected users deleted");
      }}>Delete</Button>
      <Button variant="contained" onClick={() => onClose()}>Cancel</Button>
    </ButtonGroup>

  </div>
}
