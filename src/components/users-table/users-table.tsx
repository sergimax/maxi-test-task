import { useMemo, useState } from 'react';
import { UsersTableRow } from '../users-table-row';
import { SORTING_DIRECTION, SortingParams, UsersTableProps } from './types';
import { UsersTableHeadCell } from '../users-table-head-cell';

export const UsersTable = ({ usersList, caption }: UsersTableProps) => {
    const [sortingParams, setSortingParams] = useState<SortingParams>({
        direction: SORTING_DIRECTION.ASC,
        key: undefined,
    });

    function applySorting(key: string): void {
        console.log('applySorting', key);

        let direction: SORTING_DIRECTION = SORTING_DIRECTION.ASC;

        if (
            sortingParams.key === key &&
            sortingParams.direction === SORTING_DIRECTION.ASC
        ) {
            direction = SORTING_DIRECTION.DESC;
        }
        console.log(key, direction);

        setSortingParams({
            key: key,
            direction: direction,
        });
    }

    const sortedUsers = useMemo(() => {
        let data: Array<User> = [...usersList];

        if (sortingParams.key) {
            data.sort((first, second) => {
                // console.log("first, second", first, second);

                if (first[sortingParams.key] < second[sortingParams.key]) {
                    return sortingParams.direction === SORTING_DIRECTION.ASC
                        ? -1
                        : 1;
                }

                if (first[sortingParams.key] > second[sortingParams.key]) {
                    return sortingParams.direction === SORTING_DIRECTION.ASC
                        ? 1
                        : -1;
                }

                return 0;
            });
        }

        return data;
    }, [usersList, sortingParams]);

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
                            onInputChange={console.log}
                        ></UsersTableHeadCell>
                        <UsersTableHeadCell label="username"></UsersTableHeadCell>
                        <UsersTableHeadCell
                            label="email"
                            onInputChange={console.log}
                        ></UsersTableHeadCell>
                        <UsersTableHeadCell
                            label="phone"
                            onInputChange={console.log}
                        ></UsersTableHeadCell>
                        <UsersTableHeadCell
                            label="zipcode"
                            onSorting={() => applySorting('zipcode')}
                            sortingParams={sortingParams}
                        ></UsersTableHeadCell>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user, index) => {
                        return (
                            <UsersTableRow
                                key={index}
                                data={user}
                            />
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
