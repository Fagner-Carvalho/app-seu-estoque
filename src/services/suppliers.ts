/* eslint-disable import/prefer-default-export */
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_SEU_ESTOQUE_URL as string,
  headers: {
    Accept: 'application/json',
  },
});

export const GetSuppliers = () => api
  .get('/suppliers')
  .then(({ data }) => data);

export const GetSupplier = (id: string) => api
  .get(`/suppliers/${id}`)
  .then(({ data }) => data);

export const AddSupplier = (payload: any) => api
  .post('/suppliers', payload)
  .then(({ data }) => data);

export const UpdateSupplier = (id: string, payload: any) => api
  .put(`/suppliers/${id}`, payload)
  .then(({ data }) => data);

export const DeleteSupplier = (id: string) => api
  .delete(`/suppliers/${id}`)
  .then(({ data }) => data);
