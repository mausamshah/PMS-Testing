import { test, expect } from '@playwright/test';
import { API_TOKEN, GET_USERS_ENDPOINT } from '../../utils/apiConfig';

test('GET Users API - Validate Response', async ({ request }) => {

    const response = await request.get(GET_USERS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    });

    // Status Code Validation
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    // Response Body
    const responseBody = await response.json();

    console.log(responseBody);

    // Basic Validation
    expect(responseBody.length).toBeGreaterThan(0);

    // Validate Schema (Sample)
    expect(responseBody[0]).toHaveProperty('id');
    expect(responseBody[0]).toHaveProperty('name');
    expect(responseBody[0]).toHaveProperty('email');
    expect(responseBody[0]).toHaveProperty('gender');
    expect(responseBody[0]).toHaveProperty('status');

    for (const user of responseBody) {
        expect(user).toHaveProperty('id');
        expect(user.email).toContain('@');
    }

    expect(response.status()).toBeLessThan(500);

});

//Negative Test Cases
test('GET Users API - Unauthorized', async ({ request }) => {

    const response = await request.get(GET_USERS_ENDPOINT, {
        headers: {
            Authorization: `Bearer shdg234871264jaksdkjjhaskjdhassd972198347982734`
        }
    });

    expect(response.status()).toBe(401);
});