import { UsersTableRowProps } from './types';

export const UsersTableRow = ({ data }: UsersTableRowProps) => {
    return (
        <>
            <tr>
                <td>{data.id}</td>
                <td>
                    <span>{data.name[0]}</span> {data.name}
                </td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.address.zipcode}</td>
            </tr>
        </>
    );
};
