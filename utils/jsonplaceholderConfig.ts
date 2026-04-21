export const BASE_URL =
  'https://jsonplaceholder.typicode.com';

// Common Endpoints

export const GET_POSTS =
  `${BASE_URL}/posts`;

export const CREATE_POST =
  `${BASE_URL}/posts`;

// Dynamic Endpoints

export const GET_SINGLE_POST =
  (postId: number) =>
    `${BASE_URL}/posts/${postId}`;

export const UPDATE_POST =
  (postId: number) =>
    `${BASE_URL}/posts/${postId}`;

export const PATCH_POST =
  (postId: number) =>
    `${BASE_URL}/posts/${postId}`;

export const DELETE_POST =
  (postId: number) =>
    `${BASE_URL}/posts/${postId}`;