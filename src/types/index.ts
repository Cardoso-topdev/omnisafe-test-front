export interface IUser {
  username: string;
  surname: string;
  email: string;
  password?: string;
}

export interface IStoreType {
  user: IUser;
  token: string;
  showAlert: boolean;
  alertMsg: string;
  alertIsSuccess: boolean;
}
export interface IStoreValue {
  omnisafeReducer: IStoreType;
}
