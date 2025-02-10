import { BaseSyntheticEvent } from 'react';
import { SortingParams } from '../users-table/types';

export type UsersTableHeadCellProps = {
  label: string;
  onSorting?: () => void;
  sortingParams?: SortingParams;
  onInputChange?: (event: BaseSyntheticEvent, targetLabel: string) => void;
};
