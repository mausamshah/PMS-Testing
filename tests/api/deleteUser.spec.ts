import { test, expect } from '@playwright/test';
import { API_TOKEN, CREATE_USER_ENDPOINT } from '../../utils/apiConfig';

test('DELETE User API - Validate Response', async ({ request }) => {

    const userId = 8440715; // 👉 replace with valid ID

    const response = await request.delete(`${CREATE_USER_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    });

    // Status validation
    expect(response.status()).toBe(204);

});