import { User } from "../../services/reducers/users/types";

export type UsersTableProps = {
    usersList: Array<User>;
    caption?: string;
};
