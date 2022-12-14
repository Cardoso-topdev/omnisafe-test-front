import { createContext } from 'react';
import { IUser } from 'types';

export interface AppState {
  user: IUser;
}

export const initialState: AppState = {
  user: {
    username: '',
    surname: '',
    email: ''
  }
};

const AppStateContext = createContext<AppState>(initialState);

export default AppStateContext;
