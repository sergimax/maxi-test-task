import { BaseSyntheticEvent, JSX, useMemo, useState } from 'react';
import {
  FilterParams, SORTING_DIRECTION, SortingParams, UsersTableProps,
} from './types';
import { UsersTableHeadCell } from '../users-table-head-cell';
import {
  ListOfModifiedUsers, ModifiedUserKeys, ModifiedUser,
} from '../../services/reducers/users/types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { addUser, deleteUsersById } from '../../services/reducers/users/slice';
import { MODAL_TYPE } from '../../constants/constants';
import { NewUserForm } from '../form-new-user';
import { usersSelector } from "../../services/reducers/users/selectors.ts";
import { DeleteUserForm } from "../delete-user-form";
import {
  Button, Checkbox, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import styles from './style.module.scss';

export const UsersTable = ({
  caption, onDeleteUser, onAddUser, onModalClose,
}: UsersTableProps) => {
  const dispatch = useAppDispatch();
  const usersList: ListOfModifiedUsers = useAppSelector(usersSelector);

  const [sortingParams, setSortingParams] = useState<SortingParams>({
    direction: SORTING_DIRECTION.ASC, key: undefined,
  });

  const [filterParams, setFilterParams] = useState<FilterParams>({
    name: '', email: '', phone: '',
  });

  const [selectedUsers, setSelectedUsers] = useState<Set<number> | null>(null);

  function applySorting(key: string): void {
    let direction: SORTING_DIRECTION = SORTING_DIRECTION.ASC;

    if (sortingParams.key === key && sortingParams.direction === SORTING_DIRECTION.ASC) {
      direction = SORTING_DIRECTION.DESC;
    }

    setSortingParams({
      key: key, direction: direction,
    });
  }

  const sortedUsers = useMemo(() => {
    const data: ListOfModifiedUsers = [...usersList];
    const sortingKey: ModifiedUserKeys = sortingParams.key as ModifiedUserKeys;

    if (sortingKey) {
      data.sort((first, second) => {
        if (first[sortingKey] < second[sortingKey]) {
          return sortingParams.direction === SORTING_DIRECTION.ASC ? -1 : 1;
        }

        if (first[sortingKey] > second[sortingKey]) {
          return sortingParams.direction === SORTING_DIRECTION.ASC ? 1 : -1;
        }

        return 0;
      });
    }

    return data;
  }, [usersList, sortingParams]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter((user: ModifiedUser) => {
      if (user.name
        .toLocaleLowerCase()
        .includes(filterParams.name.toLocaleLowerCase()) && user.email
        .toLocaleLowerCase()
        .includes(filterParams.email.toLocaleLowerCase()) && user.phone
        .toLocaleLowerCase()
        .includes(filterParams.phone.toLocaleLowerCase())) {
        return true;
      }
    });
  }, [filterParams, sortedUsers]);

  function handleInputValueChange(event: BaseSyntheticEvent, targetLabel: string): void {
    setFilterParams({
      ...filterParams, [targetLabel]: event.target.value,
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

  function handleDeleteUsers(usersIds: Set<number>): void {
    const dataForModal: {
      type: MODAL_TYPE; content: JSX.Element
    } = {
      type: MODAL_TYPE.DELETE_USER, content: (<DeleteUserForm onClose={onModalClose} onDelete={() => {
        dispatch(deleteUsersById({ value: Array.from(usersIds.values()) }));
        setSelectedUsers(null);
      }} />)
    };

    onDeleteUser(dataForModal);
  }

  function handleAddUser() {
    const dataForModal: {
      type: MODAL_TYPE; content: JSX.Element
    } = {
      type: MODAL_TYPE.CREATE_USER, content: <NewUserForm onClose={onModalClose} onSubmit={(data: ModifiedUser) => {
        dispatch(addUser({ value: data }))
      }}></NewUserForm>
    }

    onAddUser(dataForModal);
  }

  return (<>
    <div className={styles.controls}>
      <Button variant="contained" onClick={handleAddUser}>Add user</Button>
      <div className={styles.deletion}>
        {selectedUsers && selectedUsers.size > 0 ? (<>
          <Button variant="contained" onClick={() => handleDeleteUsers(selectedUsers)}>
            Delete users with ids: {[...selectedUsers].join(', ')}
          </Button>
        </>) : <>Select user for deletion</>}
      </div>
    </div>

      <TableContainer component={Paper}>
        <Table>
          {caption && <caption>{caption}</caption>}
          <TableHead>
            <TableRow>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user: ModifiedUser) => {
              return (<TableRow
                key={user.id}
              >
                <TableCell component="th" scope="row">
                  <FormControlLabel control={<Checkbox type="checkbox"
                                                       name="UsersTableRow"
                                                       value={user.id}
                                                       onChange={(event: BaseSyntheticEvent) => handleRowSelection(event)}
                  />} label={user.id} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.phone}</TableCell>
                <TableCell align="left">{user.address?.zipcode || user.zipcode || ""}</TableCell>
              </TableRow>);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>);
};
