import { test, expect } from '@playwright/test';
import { API_TOKEN, CREATE_USER_ENDPOINT, GET_USERS_ENDPOINT } from '../../utils/apiConfig';

test('POST → GET → PUT → PATCH → DELETE → GET LIST Flow', async ({ request }) => {

    let userId: number;
    let userEmail: string;

    // 🔹 STEP 1: CREATE USER (POST)
    await test.step('Create User (POST)', async () => {

        userEmail = `test${Date.now()}@mailinator.com`;

        const response = await request.post(CREATE_USER_ENDPOINT, {
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

        expect(response.status()).toBe(201);

        const body = await response.json();
        console.log('POST Response:', body);

        userId = body.id;

        expect(body.email).toBe(userEmail);

        // Attach response
        await test.info().attach('POST Response', {
            body: JSON.stringify(body, null, 2),
            contentType: 'application/json'
        });
    });

    // 🔹 STEP 2: GET USER
    await test.step('Get SingleUser (GET)', async () => {

        const response = await request.get(`${CREATE_USER_ENDPOINT}/${userId}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('GET Response:', body);

        expect(body.id).toBe(userId);
        expect(body.email).toBe(userEmail);

        await test.info().attach('GET Response', {
            body: JSON.stringify(body, null, 2),
            contentType: 'application/json'
        });
    });

    // 🔹 STEP 3: UPDATE USER (PUT)
    await test.step('Update User (PUT)', async () => {

        const updatedEmail = `updated${Date.now()}@mailinator.com`;

        const response = await request.put(`${CREATE_USER_ENDPOINT}/${userId}`, {
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

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('PUT Response:', body);

        expect(body.name).toBe('Updated Ravi');
        expect(body.email).toBe(updatedEmail);

        userEmail = updatedEmail;

        await test.info().attach('PUT Response', {
            body: JSON.stringify(body, null, 2),
            contentType: 'application/json'
        });
    });

    // 🔹 STEP 4: PATCH USER
    await test.step('Patch User (PATCH)', async () => {

        const patchedName = 'Patched Ravi';

        const response = await request.patch(`${CREATE_USER_ENDPOINT}/${userId}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: {
                name: patchedName
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('PATCH Response:', body);

        expect(body.name).toBe(patchedName);
        expect(body.email).toBe(userEmail);

        await test.info().attach('PATCH Response', {
            body: JSON.stringify(body, null, 2),
            contentType: 'application/json'
        });
    });

    // 🔹 STEP 5: DELETE USER
    await test.step('Delete User (DELETE)', async () => {

        const response = await request.delete(`${CREATE_USER_ENDPOINT}/${userId}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        expect(response.status()).toBe(204);
    });

    // 🔹 STEP 6: VERIFY DELETION
    await test.step('Verify User Deleted', async () => {

        const response = await request.get(`${CREATE_USER_ENDPOINT}/${userId}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        expect(response.status()).toBe(404);
    });

    // 🔹 STEP 7: GET USER LIST
    await test.step('Get User List (GET)', async () => {

        const response = await request.get(`${GET_USERS_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('GET Response:', body);

        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('name');
        expect(body[0]).toHaveProperty('email');
        expect(body[0]).toHaveProperty('gender');
        expect(body[0]).toHaveProperty('status');

        await test.info().attach('GET Response', {
            body: JSON.stringify(body, null, 2),
            contentType: 'application/json'
        });
    });

});