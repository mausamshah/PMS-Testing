import { test, expect } from '@playwright/test';
import { API_TOKEN, CREATE_USER_ENDPOINT } from '../../utils/apiConfig';

test('POST Create User API - Validate Response', async ({ request }) => {

    // Generate dynamic email
    const random = Math.random().toString(36).substring(2);
    const userEmail = `jim${random}@mailinator.com`;

    console.log('Generated Email:', userEmail);

    // Request Payload
    const requestBody = {
        name: 'Tenali Ramakrishna444444',
        gender: 'male',
        email: userEmail,
        status: 'active'
    };

    // API Call
    const response = await request.post(CREATE_USER_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: requestBody
    });

    // 🔍 Assertions

    // Status Code
    expect(response.status()).toBe(201);

    // Parse Response
    const responseBody = await response.json();
    console.log(responseBody);

    // Validate Response Data
    expect(responseBody.name).toBe(requestBody.name);
    expect(responseBody.email).toBe(userEmail);
    expect(responseBody.gender).toBe('male');
    expect(responseBody.status).toBe('active');

    // Validate ID generated
    expect(responseBody).toHaveProperty('id');

});