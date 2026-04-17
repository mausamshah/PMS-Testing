import { test, expect } from '@playwright/test';
import { API_TOKEN, CREATE_USER_ENDPOINT } from '../../utils/apiConfig';

test('POST → DELETE → VERIFY User Flow', async ({ request }) => {

    // 🔹 Step 1: Create User
    const email = `test${Date.now()}@mailinator.com`;

    const createRes = await request.post(CREATE_USER_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: {
            name: 'Delete Test User',
            gender: 'male',
            email,
            status: 'active'
        }
    });

    expect(createRes.status()).toBe(201);

    const createBody = await createRes.json();
    const userId = createBody.id;

    console.log('Created User ID:', userId);

    // 🔹 Step 2: DELETE User
    const deleteRes = await request.delete(`${CREATE_USER_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    });

    expect(deleteRes.status()).toBe(204);

    // 🔹 Step 3: Verify User Deleted
    const getRes = await request.get(`${CREATE_USER_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    });

    expect(getRes.status()).toBe(404); // user should not exist

});