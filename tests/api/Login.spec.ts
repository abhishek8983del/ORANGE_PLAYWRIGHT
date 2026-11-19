import { test, expect } from '@playwright/test'
import { Routes } from '../../api/endpoints/routes';

import { registerUser, loginAdmin } from '../../utils/authHelper';



test.describe('Authentication Test Cases', () => {
    const BASE_URL = Routes.BASE_URL!;
    const EMAIL = process.env.API_AUTH_EMAIL;
    const PASSWD = process.env.API_AUTH_PASSWORD;
    let adminToken: string;

    test.beforeAll(async ({ request }) => {
        let adminToken = await loginAdmin(request);
    });

    test('Valid-Login', async ({ request }) => {
        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: {
                email: EMAIL,
                password: PASSWD
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.data.accessToken).toBeDefined();
        expect(responseBody.data.user.email).toBe(EMAIL);
    })
    test('Register-User', async ({ request }) => {
        const { payload, responseBody, userToken, status } = await registerUser(request);

        expect(status).toBe(201);
        expect(userToken).toBeDefined();
        expect(responseBody.data.name).toBe(payload.name);
        expect(responseBody.data.email).toBe(payload.email);
        expect(responseBody.data.role).toBe('user');
        expect(responseBody.data.id).toEqual(expect.any(Number));
    });

    test('Auth-Me-User', async ({ request }) => {
        const { userToken, payload } = await registerUser(request);

        const response = await request.get(
            `${BASE_URL}${Routes.AUTH_ME}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.data.role).toBe('user');
        expect(responseBody.data.email).toBe(payload.email);
    });
    test('Auth-Me-Admin', async ({ request }) => {
        const adminToken = await loginAdmin(request);
        const response = await request.get(`${BASE_URL}${Routes.AUTH_ME}`, {
            headers: {
                Authorization: `Bearer ${adminToken}`
            }
        });
        expect(response.status()).toBe(200);
        expect(response).toBeDefined();
        const responseBody = await response.json();
        expect(responseBody.data.role).toEqual('admin');
        expect(responseBody.data.email).toEqual(EMAIL);
    });
});