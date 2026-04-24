import { test, expect } from '@playwright/test';
import { API_TOKEN, GET_USERS_ENDPOINT } from '../../../utils/apiConfig';

test('GET Single User API - Validate Response', async ({ request }) => {

    const userId = 8448066; // 👉 Replace with real ID

    const response = await request.get(`${GET_USERS_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    });

    // Status Validation
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    // Field Validation
    expect(responseBody).toHaveProperty('id', userId);
    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('email');
    expect(responseBody).toHaveProperty('gender');
    expect(responseBody).toHaveProperty('status');

});

//Negative Test Case
test('GET User API - Invalid ID', async ({ request }) => {

    const response = await request.get(`${GET_USERS_ENDPOINT}/999999999`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    });

    expect(response.status()).toBe(404);
});