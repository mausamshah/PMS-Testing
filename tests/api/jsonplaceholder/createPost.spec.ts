import { test, expect } from '@playwright/test';

import {
  CREATE_POST
} from '../../../utils/jsonplaceholderConfig';

import {
  APIHelper
} from '../../../utils/apiHelper';


test('TC_003 Create New Post', async ({ request }) => {

  const requestBody = {

    title: 'Playwright API Testing',

    body: 'Learning API Automation',

    userId: 1

  };

  const api = new APIHelper(request);

  const response =
  await api.post(
    CREATE_POST,
    requestBody
  );

  expect(response.status())
    .toBe(201);

  const responseBody =
    await response.json();

  // Validate created data

  expect(responseBody.title)
    .toBe(requestBody.title);

});