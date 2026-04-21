import { test, expect } from '@playwright/test';
import { API_TOKEN, CREATE_USER_ENDPOINT } from '../../../utils/apiConfig';

test('POST → PATCH → GET User Flow', async ({ request }) => {

    // 🔹 Step 1: Create User
    const email = `test${Date.now()}@mailinator.com`;

    const createRes = await request.post(CREATE_USER_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: {
            name: 'Original Name',
            gender: 'male',
            email,
            status: 'active'
        }
    });

    expect(createRes.status()).toBe(201);

    const createBody = await createRes.json();
    const userId = createBody.id;

    console.log('User Created:', userId);

    // 🔹 Step 2: PATCH (update only name)
    const updatedName = 'Updated via PATCH';

    const patchRes = await request.patch(`${CREATE_USER_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: {
            name: updatedName
        }
    });

    expect(patchRes.status()).toBe(200);

    const patchBody = await patchRes.json();
    expect(patchBody.name).toBe(updatedName);

    // 🔹 Step 3: GET and verify
    const getRes = await request.get(`${CREATE_USER_ENDPOINT}/${userId}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    });

    expect(getRes.status()).toBe(200);

    const getBody = await getRes.json();

    expect(getBody.name).toBe(updatedName);
    expect(getBody.email).toBe(email); // unchanged

});