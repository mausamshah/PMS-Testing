import { test, expect } from '@playwright/test';

import {
  UPDATE_POST
} from '../../../utils/jsonplaceholderConfig';

import {
  APIHelper
} from '../../../utils/apiHelper';


test('TC_004 Update Post Using PUT', async ({ request }) => {

  const postId = 1;

  const requestBody = {

    id: postId,

    title: 'Updated Title',

    body: 'Updated Body',

    userId: 1

  };
  const api = new APIHelper(request);
  
  const response = await api.put(
  UPDATE_POST(postId),
  requestBody
    );

  expect(response.status())
    .toBe(200);

  const responseBody =
    await response.json();

  expect(responseBody.title)
    .toBe('Updated Title');

});