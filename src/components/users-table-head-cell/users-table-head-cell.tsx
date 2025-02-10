import { SORTING_DIRECTION } from '../users-table/types';
import styles from './style.module.scss';
import { UsersTableHeadCellProps } from './types';
import { TextField } from "@mui/material";

export const UsersTableHeadCell = ({
    label,
    onSorting,
    sortingParams,
    onInputChange,
}: UsersTableHeadCellProps) => {
    const classNames = onSorting ? styles.sortable : '';

    const sortingTrend =
        sortingParams?.key === label
            ? sortingParams.direction === SORTING_DIRECTION.ASC
                ? ' ▲'
                : ' ▼'
            : '';

    return (
        <th className={classNames}>
            <div className={styles['head-cell']}>
                <div onClick={() => onSorting && onSorting()} className={styles['head-cell__label']} >
                    {label}
                    {sortingTrend && <span>{sortingTrend}</span>}
                </div>
                {onInputChange && (
                    <TextField size={"small"}
                        onChange={(event) => onInputChange && onInputChange(event, label)}
                    ></TextField>
                )}
            </div>
        </th>
    );
};
