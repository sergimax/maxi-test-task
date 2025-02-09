import { SORTING_DIRECTION, SortingParams } from '../users-table/types';
import styles from './style.module.scss';

export type UsersTableHeadCellProps = {
    label: string;
    onSorting?: () => void;
    sortingParams?: SortingParams;
    onInputChange?: () => void;
};

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
                ? '▲'
                : '▼'
            : '';

    return (
        <th className={classNames}>
            <div className={styles['head-cell']}>
                <span onClick={onSorting}>
                    {label}
                    {sortingTrend && <span>{sortingTrend}</span>}
                </span>
                {onInputChange && <input onChange={onInputChange}></input>}
            </div>
        </th>
    );
};
