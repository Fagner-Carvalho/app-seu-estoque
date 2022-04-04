/* eslint-disable import/prefer-default-export */
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_SEU_ESTOQUE_URL as string,
  headers: {
    Accept: 'application/json',
  },
});

export const GetUsers = () => api
  .get('/users')
  .then(({ data }) => data);

export const GetUser = (id: string) => api
  .get(`/users/${id}`)
  .then(({ data }) => data);

export const AddUsers = (payload: any) => api
  .post('/users', payload)
  .then(({ data }) => data);

export const UpdateUser = (id: string, payload: any) => api
  .put(`/users/${id}`, payload)
  .then(({ data }) => data);

export const DeleteUser = (id: string) => api
  .delete(`/users/${id}`)
  .then(({ data }) => data);

export const Authenticate = (
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
) => api
  .post('/sessions', { email, password })
  .then(({ data }) => data);
