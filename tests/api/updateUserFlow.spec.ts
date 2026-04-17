import { test, expect } from '@playwright/test';
import { API_TOKEN, CREATE_USER_ENDPOINT } from '../../utils/apiConfig';

test('POST → PUT → GET User Flow', async ({ request }) => {

    // 🔹 Step 1: Create User
    const email = `test${Date.now()}@mailinator.com`;

    const createRes = await request.post(CREATE_USER_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: {
            name: 'Ravi',
            gender: 'male',
            email,
            status: 'active'
        }
    });

    expect(createRes.status()).toBe(201);

    const createBody = await createRes.json();
    const userId = createBody.id;

    console.log('Created User ID:', userId);

    // 🔹 Step 2: Update User
    const updatedEmail = `updated${Date.now()}@mailinator.com`;

    const updateRes = await request.put(`${CREATE_USER_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: {
            name: 'Updated Ravi',
            email: updatedEmail,
            status: 'active'
        }
    });

    expect(updateRes.status()).toBe(200);

    const updateBody = await updateRes.json();

    expect(updateBody.name).toBe('Updated Ravi');
    expect(updateBody.email).toBe(updatedEmail);

    // 🔹 Step 3: Get Updated User
    const getRes = await request.get(`${CREATE_USER_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    });

    expect(getRes.status()).toBe(200);

    const getBody = await getRes.json();

    expect(getBody.name).toBe('Updated Ravi');
    expect(getBody.email).toBe(updatedEmail);

});