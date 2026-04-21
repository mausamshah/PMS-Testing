import { test, expect } from '@playwright/test';

import {
  PATCH_POST
} from '../../../utils/jsonplaceholderConfig';

import {
  APIHelper
} from '../../../utils/apiHelper';


test('TC_005 Update Post Using PATCH', async ({ request }) => {

  const postId = 1;

  const requestBody = {

    title: 'Patched Title'

  };

  const api = new APIHelper(request);
  
  const response = await api.patch(
  PATCH_POST(postId),
  requestBody
);

  expect(response.status())
    .toBe(200);

  const responseBody =
    await response.json();

  expect(responseBody.title)
    .toBe('Patched Title');

});