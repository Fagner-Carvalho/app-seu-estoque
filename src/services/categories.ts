/* eslint-disable import/prefer-default-export */
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_SEU_ESTOQUE_URL as string,
  headers: {
    Accept: 'application/json',
  },
});

export const GetCategories = () => api
  .get('/categories')
  .then(({ data }) => data);

export const GetCategory = (id: string) => api
  .get(`/categories/${id}`)
  .then(({ data }) => data);

export const AddCategory = (payload: any) => api
  .post('/categories', payload)
  .then(({ data }) => data);

export const UpdateCategory = (id: string, payload: any) => api
  .put(`/categories/${id}`, payload)
  .then(({ data }) => data);

export const DeleteCategory = (id: string) => api
  .delete(`/categories/${id}`)
  .then(({ data }) => data);
