import { test, expect } from '@playwright/test'
import { Routes } from '../../api/endpoints/routes';


test.describe('Users Test Cases',()=>{
    const BASE_URL = Routes.BASE_URL!;

    test('Get list of all users',async({request})=>{
        const response=await request.get(`${BASE_URL}${Routes.GET_USERS()}`)
        expect(response.status()).toBe(200);
        const responseBody= await response.json();
        expect(responseBody.data).toBeDefined();
        expect(responseBody.data.length).toBeLessThanOrEqual(10);
        expect(responseBody).toHaveProperty('data');
        responseBody.data.forEach((user:any) => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('firstName');
            expect(user).toHaveProperty('lastName');
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('status');
            expect(user).toHaveProperty('createdAt');
        });
        
    })
})