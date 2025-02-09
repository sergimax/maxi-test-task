import { BaseSyntheticEvent, useMemo, useState } from 'react';
import { UsersTableRow } from '../users-table-row';
import {
    FilterParams,
    SORTING_DIRECTION,
    SortingParams,
    UsersTableProps,
} from './types';
import { UsersTableHeadCell } from '../users-table-head-cell';
import {
    ListOfModifiedUsers,
    ModifiedUserKeys,
    ModifiedUser,
} from '../../services/reducers/users/types';

export const UsersTable = ({ usersList, caption }: UsersTableProps) => {
    const [sortingParams, setSortingParams] = useState<SortingParams>({
        direction: SORTING_DIRECTION.ASC,
        key: undefined,
    });

    const [filterParams, setFilterParams] = useState<FilterParams>({
        name: '',
        email: '',
        phone: '',
    });

    const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

    function applySorting(key: string): void {
        let direction: SORTING_DIRECTION = SORTING_DIRECTION.ASC;

        if (
            sortingParams.key === key &&
            sortingParams.direction === SORTING_DIRECTION.ASC
        ) {
            direction = SORTING_DIRECTION.DESC;
        }

        setSortingParams({
            key: key,
            direction: direction,
        });
    }

    const sortedUsers = useMemo(() => {
        const data: ListOfModifiedUsers = [...usersList];
        const sortingKey: ModifiedUserKeys =
            sortingParams.key as ModifiedUserKeys;

        if (sortingKey) {
            data.sort((first, second) => {
                if (first[sortingKey] < second[sortingKey]) {
                    return sortingParams.direction === SORTING_DIRECTION.ASC
                        ? -1
                        : 1;
                }

                if (first[sortingKey] > second[sortingKey]) {
                    return sortingParams.direction === SORTING_DIRECTION.ASC
                        ? 1
                        : -1;
                }

                return 0;
            });
        }

        return data;
    }, [usersList, sortingParams]);

    const filteredUsers = useMemo(() => {
        return sortedUsers.filter((user: ModifiedUser) => {
            if (
                user.name
                    .toLocaleLowerCase()
                    .includes(filterParams.name.toLocaleLowerCase()) &&
                user.email
                    .toLocaleLowerCase()
                    .includes(filterParams.email.toLocaleLowerCase()) &&
                user.phone
                    .toLocaleLowerCase()
                    .includes(filterParams.phone.toLocaleLowerCase())
            ) {
                return true;
            }
        });
    }, [filterParams, sortedUsers]);

    function handleInputValueChange(
        event: BaseSyntheticEvent,
        targetLabel: string
    ): void {
        setFilterParams({
            ...filterParams,
            [targetLabel]: event.target.value,
        });
    }

    function handleRowSelection(event: BaseSyntheticEvent): void {
        const newSelectedUsers = new Set(selectedUsers);

        if (event.target.checked) {
            newSelectedUsers.add(event.target.value);
        } else {
            newSelectedUsers.delete(event.target.value);
        }
        setSelectedUsers(newSelectedUsers);
    }

    return (
        <>
            <table>
                {caption && <caption>{caption}</caption>}
                <thead>
                    <tr>
                        <UsersTableHeadCell
                            label="id"
                            onSorting={() => applySorting('id')}
                            sortingParams={sortingParams}
                        ></UsersTableHeadCell>
                        <UsersTableHeadCell
                            label="name"
                            onSorting={() => applySorting('name')}
                            sortingParams={sortingParams}
                            onInputChange={handleInputValueChange}
                        ></UsersTableHeadCell>
                        <UsersTableHeadCell label="username"></UsersTableHeadCell>
                        <UsersTableHeadCell
                            label="email"
                            onInputChange={handleInputValueChange}
                        ></UsersTableHeadCell>
                        <UsersTableHeadCell
                            label="phone"
                            onInputChange={handleInputValueChange}
                        ></UsersTableHeadCell>
                        <UsersTableHeadCell
                            label="zipcode"
                            onSorting={() => applySorting('zipcode')}
                            sortingParams={sortingParams}
                        ></UsersTableHeadCell>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => {
                        return (
                            <UsersTableRow
                                key={index}
                                data={user}
                                onRowSelect={handleRowSelection}
                            />
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
