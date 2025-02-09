import { UsersTableRow } from '../users-table-row';
import { UsersTableProps } from './types';

export const UsersTable = ({ usersList, caption }: UsersTableProps) => {
    return (
        <>
            <table>
                {caption && <caption>{caption}</caption>}
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>username</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>zipcode</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((user, index) => {
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
