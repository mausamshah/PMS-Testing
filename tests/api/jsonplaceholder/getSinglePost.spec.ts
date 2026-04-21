import { test, expect } from '@playwright/test';

import {
  GET_SINGLE_POST
} from '../../../utils/jsonplaceholderConfig';


test('TC_002 Get Single Post Details', async ({ request }) => {

  const postId = 1;

  const response =
    await request.get(
      GET_SINGLE_POST(postId)
    );

  expect(response.status())
    .toBe(200);

  const responseBody =
    await response.json();

  // Validate response contains correct ID

  expect(responseBody.id)
    .toBe(postId);

});