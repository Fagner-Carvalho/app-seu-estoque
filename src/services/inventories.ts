/* eslint-disable import/prefer-default-export */
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_SEU_ESTOQUE_URL as string,
  headers: {
    Accept: 'application/json',
  },
});

export const GetInventories = () => api
  .get('/inventoryMovements')
  .then(({ data }) => data);

export const GetInventory = (id: string) => api
  .get(`/inventoryMovements/${id}`)
  .then(({ data }) => data);

export const AddInventory = (payload: any) => api
  .post('/inventoryMovements', payload)
  .then(({ data }) => data);

export const UpdateInventory = (id: string, payload: any) => api
  .put(`/inventoryMovements/${id}`, payload)
  .then(({ data }) => data);

export const DeleteInventory = (id: string) => api
  .delete(`/inventoryMovements/${id}`)
  .then(({ data }) => data);

export const GetReportInventoryValuePerItem = () => api
  .get('/reportInventoryValuePerItem')
  .then(({ data }) => data);

export const GetReportInventoryQuantity = () => api
  .get('/reportInventoryQuantity')
  .then(({ data }) => data);
