import { BaseSyntheticEvent } from 'react';
import { User } from '../../services/reducers/users/types';

export type UsersTableRowProps = {
    data: User;
    onRowSelect: (event: BaseSyntheticEvent) => void;
};
