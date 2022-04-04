/* eslint-disable import/prefer-default-export */
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_SEU_ESTOQUE_URL as string,
  headers: {
    Accept: 'application/json',
  },
});

export const GetItems = () => api
  .get('/items')
  .then(({ data }) => data);

export const GetItem = (id: string) => api
  .get(`/items/${id}`)
  .then(({ data }) => data);

export const AddItems = (payload: any) => api
  .post('/items', payload)
  .then(({ data }) => data);

export const UpdateItem = (id: string, payload: any) => api
  .put(`/items/${id}`, payload)
  .then(({ data }) => data);

export const DeleteItem = (id: string) => api
  .delete(`/items/${id}`)
  .then(({ data }) => data);
