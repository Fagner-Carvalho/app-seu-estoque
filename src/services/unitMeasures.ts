/* eslint-disable import/prefer-default-export */
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_SEU_ESTOQUE_URL as string,
  headers: {
    Accept: 'application/json',
  },
});

export const GetUnitMeasures = () => api
  .get('/unitMeasures')
  .then(({ data }) => data);

export const GetUnitMeasure = (id: string) => api
  .get(`/unitMeasures/${id}`)
  .then(({ data }) => data);

export const AddUnitMeasure = (payload: any) => api
  .post('/unitMeasures', payload)
  .then(({ data }) => data);

export const UpdateUnitMeasure = (id: string, payload: any) => api
  .put(`/unitMeasures/${id}`, payload)
  .then(({ data }) => data);

export const DeleteUnitMeasure = (id: string) => api
  .delete(`/unitMeasures/${id}`)
  .then(({ data }) => data);
