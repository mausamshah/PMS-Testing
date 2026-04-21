import { test, expect } from '@playwright/test';

import {
  DELETE_POST
} from '../../../utils/jsonplaceholderConfig';
import {
  APIHelper
} from '../../../utils/apiHelper';

test('TC_006 Delete Post', async ({ request }) => {

  const postId = 1;

 
  const api = new APIHelper(request);
  
  const response = await api.delete(
  DELETE_POST(postId)
  );

  expect(response.status())
    .toBe(200);

});