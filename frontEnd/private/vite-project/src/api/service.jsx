import postgresInstance from './instance';

export const getData = (url) => postgresInstance.get(url);

export const setData = (url, data) => postgresInstance.post(url, data);

export const editData = (url, data) => postgresInstance.patch(url, data);

export const deleteData = (url) => postgresInstance.delete(url);
