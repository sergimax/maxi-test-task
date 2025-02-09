import { useMemo, useState } from 'react';
import { UsersTableRow } from '../users-table-row';
import { SORTING_DIRECTION, SortingParams, UsersTableProps } from './types';
import styles from './style.module.scss';

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
                    <tr className={styles.row}>
                        <th onClick={() => applySorting('id')}>id</th>
                        <th onClick={() => applySorting('name')}>name</th>
                        <th onClick={() => applySorting('username')}>
                            username
                        </th>
                        <th onClick={() => applySorting('email')}>email</th>
                        <th onClick={() => applySorting('phone')}>phone</th>
                        <th onClick={() => applySorting('zipcode')}>zipcode</th>
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
