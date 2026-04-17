import { API_TOKEN } from './apiConfig';

export const getHeaders = () => ({
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
});