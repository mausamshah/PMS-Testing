import { test, expect } from '@playwright/test';
import { API_TOKEN, CREATE_USER_ENDPOINT } from '../../../utils/apiConfig';

test('PATCH Update User Name - Validate Response', async ({ request }) => {

    const userId = 8448066; // 👉 replace with valid ID

    const updatedName = 'NOLAN KHAN';

    const response = await request.patch(`${CREATE_USER_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: {
            name: updatedName
        }
    });

    // Status validation
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    // Validate only updated field
    expect(responseBody.name).toBe(updatedName);

    // Ensure other fields still exist
    expect(responseBody).toHaveProperty('email');
    expect(responseBody).toHaveProperty('gender');
    expect(responseBody).toHaveProperty('status');

});

//Negative Test Case
test('PATCH User - Invalid ID', async ({ request }) => {

    const response = await request.patch(`${CREATE_USER_ENDPOINT}/99999999`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: {
            name: 'Test'
        }
    });

    expect(response.status()).toBe(404);
});