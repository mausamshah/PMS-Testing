import { test, expect } from '@playwright/test';
import { API_TOKEN, CREATE_USER_ENDPOINT } from '../../utils/apiConfig';

test('POST + GET User API Flow', async ({ request }) => {

    // Step 1: Create User
    const random = Math.random().toString(36).substring(2);
    const userEmail = `jim${random}@mailinator.com`;

    const createResponse = await request.post(CREATE_USER_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: {
            name: 'Ravi Shah',
            gender: 'male',
            email: userEmail,
            status: 'active'
        }
    });

    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();
    const userId = createBody.id;

    console.log('Created User ID:', userId);

    // Step 2: Get Same User
    const getResponse = await request.get(`${CREATE_USER_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    });

    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();
    console.log(getBody);

    // Validation
    expect(getBody.id).toBe(userId);
    expect(getBody.email).toBe(userEmail);

});

test('GET User API - Invalid ID', async ({ request }) => {

    const response = await request.get(`${CREATE_USER_ENDPOINT}/999999999`, {
        headers: {
            Authorization: `Bearer a2ab6105ef70ca4628eada4701f14d04607c32f59c1831dc53ea4b1f672d699d`
        }
    });

    expect(response.status()).toBe(404);
});