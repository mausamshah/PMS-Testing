import { test, expect } from '@playwright/test';
import { API_TOKEN, CREATE_USER_ENDPOINT } from '../../utils/apiConfig';

test('PUT Update User API - Validate Response', async ({ request }) => {

    const userId = 8440468; // 👉 replace with real ID

    const updatedData = {
        name: 'jimgxttt90ykaf',
        email: `jim${Date.now()}@yopmail.com`, // dynamic email
        status: 'active'
    };

    const response = await request.put(`${CREATE_USER_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: updatedData
    });

    // Status validation
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log(responseBody);

    // Validate updated fields
    expect(responseBody.name).toBe(updatedData.name);
    expect(responseBody.email).toBe(updatedData.email);
    expect(responseBody.status).toBe(updatedData.status);

});

//Negative Test Case
test('PUT User - Invalid ID', async ({ request }) => {

    const response = await request.put(`${CREATE_USER_ENDPOINT}/99999999`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: {
            name: 'Test',
            email: `test${Date.now()}@mail.com`,
            status: 'active'
        }
    });

    expect(response.status()).toBe(404);
});