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
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>
                                    <span>{user.name[0]}</span> {user.name}
                                </td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.address.zipcode}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
