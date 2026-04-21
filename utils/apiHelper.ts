import { API_TOKEN } from './apiConfig';

export const getHeaders = () => ({
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
});

import { APIRequestContext } from '@playwright/test';

export class APIHelper {

  constructor(
    private request: APIRequestContext
  ) {}

  // GET

  async get(endpoint: string) {

    return await this.request.get(
      endpoint
    );

  }

  // POST

  async post(
    endpoint: string,
    body: any
  ) {

    return await this.request.post(
      endpoint,
      {
        data: body
      }
    );

  }

  // PUT

  async put(
    endpoint: string,
    body: any
  ) {

    return await this.request.put(
      endpoint,
      {
        data: body
      }
    );

  }

  // PATCH

  async patch(
    endpoint: string,
    body: any
  ) {

    return await this.request.patch(
      endpoint,
      {
        data: body
      }
    );

  }

  // DELETE

  async delete(endpoint: string) {

    return await this.request.delete(
      endpoint
    );

  }

}