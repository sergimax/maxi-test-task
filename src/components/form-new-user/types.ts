import { ModifiedUser } from "../../services/reducers/users/types.ts";

export type FormData = {
  name: string; username: string; email: string; phone: string; zipcode?: string;
}

export type NewUserFormProps = {
  onClose: () => void; onSubmit: (data: ModifiedUser) => void;
}
