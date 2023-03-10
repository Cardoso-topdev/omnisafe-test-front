import { IUser } from 'types';
import { httpClient } from './http-client';

const BASE_URL = 'http://localhost:3001/';

export const omnisafeAPIs = {
  signUp: async (params: IUser) => {
    return await httpClient.post(`${BASE_URL}sign-up`, params);
  },
  signIn: async (params: { email: string; password: string }) => {
    return await httpClient.post(`${BASE_URL}sign-in`, params);
  },
  getEventTypes: async () => {
    const token = 'bearer ' + window.localStorage.getItem('APP_TOKEN') || '';
    return await httpClient.get(`${BASE_URL}event-types`, {}, {
      authorization: token 
    })
  }
};
