import { APIRequestContext } from "@playwright/test";
import { Routes } from "../api/endpoints/routes";
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();
export async function registerUser(request:APIRequestContext) {
    const payload = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 8 })
    }
    const response = await request.post(
        `${Routes.BASE_URL}${Routes.AUTH_REGISTER}`,
        {
            data: payload
        }
    );
    const body = await response.json();

    return { payload, userToken: body.data.accessToken, responseBody: body, status: response.status() };
}
export async function loginAdmin(request: APIRequestContext) {
    const mail = process.env.API_AUTH_EMAIL;
    const passwd = process.env.API_AUTH_PASSWORD;

    const credentials = {
        email: mail,
        password: passwd,
    };
    const response = await request.post(
        `${Routes.BASE_URL}${Routes.AUTH_LOGIN}`,
        { data: credentials }
    );

    const body = await response.json();
    let token=await body.data.accessToken;
    console.log(token);
    return token;
}