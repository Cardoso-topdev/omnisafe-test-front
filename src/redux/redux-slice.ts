import { createSlice } from '@reduxjs/toolkit';
import { IUser, IStoreType, IEventType, IEvent } from 'types';

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

interface IEventsPayload {
  payload: Array<IEventType>;
}

interface ISubscribePayload {
  payload: IEventType;
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
    alertIsSuccess: true,
    eventTypes: [],
    events: []
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
    },
    logout: (state: IStoreType) => {
      state.user = {
        username: '',
        surname: '',
        email: ''
      }
      window.localStorage.clear();
    },
    setEvents: (state: IStoreType, action: IEventsPayload) => {
      let events: Array<IEvent> = []
      state.eventTypes = action.payload.map((eventTypeItem: IEventType) => ({
        id: eventTypeItem.id,
        name: eventTypeItem.name,
        subscribed: true
      }))
      for (let idx = 0; idx < action.payload.length; idx++) {
        const eventItem = action.payload[idx];
        events = [...events, ...(eventItem.events as Array<IEvent>)];
      }
      state.events = events;
    },
    subscribeEventType: (state: IStoreType, action: ISubscribePayload) => {
      state.eventTypes = state.eventTypes.map( eventTypeItem => {
        if (action.payload.id === eventTypeItem.id) {
          return {...eventTypeItem, subscribed: !eventTypeItem.subscribed}
        } else {
          return eventTypeItem;
        }
      })
    }
  }
});

export const { setUser, setToken, showAlertMsg, logout, setEvents, subscribeEventType } = reduxSlice.actions;

export default reduxSlice.reducer;
