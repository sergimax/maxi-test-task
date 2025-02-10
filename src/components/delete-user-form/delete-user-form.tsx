import { Button } from "@mui/material";
import { DeleteUserFormProps } from "./types.ts";

export const DeleteUserForm = ({ onDelete, onClose }: DeleteUserFormProps) => {
  return <>
    <h3>Delete selected users?</h3>
    <Button onClick={() => {
      onDelete();
      onClose("Selected users deleted");
    }}>Delete</Button>
    <Button onClick={() => onClose()}>Cancel</Button>
  </>
}
