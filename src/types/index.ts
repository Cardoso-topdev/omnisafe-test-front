export interface IEvent {
  id: number;
  name: string;
  description: string;
  eventsTypeId: number;
  status: boolean;
}

export interface IEventType {
  id: number;
  name: string;
  subscribed?: boolean;
  events?: Array<IEvent>
}

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
  events: Array<IEvent>;
  eventTypes: Array<IEventType>;
}
export interface IStoreValue {
  omnisafeReducer: IStoreType;
}
