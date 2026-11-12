import { test, expect } from '@playwright/test'
import { Routes } from '../../api/endpoints/routes';

test.describe('Products API Tests', () => {
    const BASE_URL = Routes.BASE_URL!;
    const PRODUCT_ID = 1;

    test('GET-All Products', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`);
        console.log(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`)
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.length).toBeGreaterThan(0);

        responseBody.forEach((product: any) => {
            expect(product).toHaveProperty('id')
            expect(product).toHaveProperty('title')
            expect(product).toHaveProperty('price')
            expect(product).toHaveProperty('category')
            expect(product).toHaveProperty('image')
        });

    });

    test('GET-Product by ID', async ({ request }) => {
        const response = await request.get(BASE_URL + Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID)));
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.id).toBe(PRODUCT_ID);
        expect(responseBody).toHaveProperty('title');
        expect(responseBody).toHaveProperty('price');
        expect(responseBody).toHaveProperty('category');
        expect(responseBody).toHaveProperty('image');
    })
});