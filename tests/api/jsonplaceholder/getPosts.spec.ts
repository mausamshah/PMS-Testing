import { test, expect } from '@playwright/test';

import {
  GET_POSTS
} from '../../../utils/jsonplaceholderConfig';

import {
  APIHelper
} from '../../../utils/apiHelper';


test('TC_001 Get All Posts List', async ({ request }) => {

  const api = new APIHelper(request);

  // Send GET request
  const response = await request.get(GET_POSTS);

  // Validate Status Code
  expect(response.status()).toBe(200);

  // Convert response to JSON
  const responseBody = await response.json();

  // Validate response is array
  expect(Array.isArray(responseBody)).toBeTruthy();

  // Validate at least one record exists
  expect(responseBody.length).toBeGreaterThan(0);

});