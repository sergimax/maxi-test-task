import { DataForModal } from '../../types/types';

export type UsersTableProps = {
    caption?: string;
    onDeleteUser: (data: DataForModal) => void;
    onAddUser: (data: DataForModal) => void;
    onModalClose: () => void;
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
