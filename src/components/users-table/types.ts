import { ListOfModifiedUsers } from '../../services/reducers/users/types';

export type UsersTableProps = {
    usersList: ListOfModifiedUsers;
    caption?: string;
};

export enum SORTING_DIRECTION {
    ASC = 'ascending',
    DESC = 'descending',
}

export type SortingParams = {
    direction: SORTING_DIRECTION;
    key?: string;
};
