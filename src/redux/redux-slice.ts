import { createSlice } from '@reduxjs/toolkit';
import { IUser, IStoreType } from 'types';

interface IReducerSetUserActionType {
  payload: IUser;
}

interface ITokenPayload {
  payload: string;
}

interface IShowAlertPayload {
  payload: {
    showAlert: boolean;
    alertMsg: string;
    alertIsSuccess: boolean;
  };
}

let initStoreValueFromLocalStorage: IUser = {
  username: '',
  surname: '',
  email: ''
};

const localStorageData = window.localStorage.getItem('MY_APP_STATE');
const localToken = window.localStorage.getItem('APP_TOKEN');
if (localStorageData) {
  initStoreValueFromLocalStorage = JSON.parse(localStorageData);
}

export const reduxSlice: any = createSlice({
  name: 'reduxSlice',
  initialState: {
    user: initStoreValueFromLocalStorage,
    token: localToken ? localToken : '',
    showAlert: false,
    alertMsg: '',
    alertIsSuccess: true
  },
  reducers: {
    setUser: (state: IStoreType, action: IReducerSetUserActionType) => {
      state.user = action.payload;
      window.localStorage.setItem('MY_APP_STATE', JSON.stringify(state.user));
    },
    setToken: (state: IStoreType, action: ITokenPayload) => {
      state.token = action.payload;
      window.localStorage.setItem('APP_TOKEN', JSON.stringify(state.token));
    },
    showAlertMsg: (state: IStoreType, action: IShowAlertPayload) => {
      state.showAlert = action.payload.showAlert;
      state.alertMsg = action.payload.alertMsg;
      state.alertIsSuccess = action.payload.alertIsSuccess;
    }
  }
});

export const { setUser, setToken, showAlertMsg } = reduxSlice.actions;

export default reduxSlice.reducer;
