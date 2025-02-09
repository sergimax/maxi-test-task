import { AppState } from '../../store';

export type FetchUsersAsyncThunkConfig = {
    state: AppState;
    rejectValue: string;
};

export type GetUsersDTO = Array<User>;

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: UserAddress;
    phone: string;
    website: string;
    company: UserCompany;
};

export type UserCompany = {
    name: string;
    catchPhrase: string;
    bs: string;
};

export type UserAddress = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
};
