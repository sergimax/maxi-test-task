import { ListOfModifiedUsers } from '../../services/reducers/users/types';
import { DataForModal } from '../../types/types';

export type UsersTableProps = {
    usersList: ListOfModifiedUsers;
    caption?: string;
    onDeleteUser: (data: DataForModal) => void;
};

export enum SORTING_DIRECTION {
    ASC = 'ascending',
    DESC = 'descending',
}

export type SortingParams = {
    direction: SORTING_DIRECTION;
    key?: string;
};

export type FilterParams = {
    name: string;
    email: string;
    phone: string;
};
