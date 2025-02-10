import { BaseSyntheticEvent } from 'react';
import { ModifiedUser } from '../../services/reducers/users/types';

export type UsersTableRowProps = {
    data: ModifiedUser;
    onRowSelect: (event: BaseSyntheticEvent) => void;
};
