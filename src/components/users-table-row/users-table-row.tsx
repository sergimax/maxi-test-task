import { BaseSyntheticEvent } from 'react';
import { UsersTableRowProps } from './types';

export const UsersTableRow = ({ data, onRowSelect }: UsersTableRowProps) => {
    return (
        <>
            <tr>
                <td>
                    <label>
                        <input
                            type="checkbox"
                            name="UsersTableRow"
                            value={data.id}
                            onChange={(event: BaseSyntheticEvent) =>
                                onRowSelect(event)
                            }
                        ></input>
                        {data.id}
                    </label>
                </td>
                <td>
                    <span>{data.name[0]}</span> {data.name}
                </td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.address?.zipcode || data.zipcode || ""}</td>
            </tr>
        </>
    );
};
