import { Page, Locator } from '@playwright/test'

export class LoginPage {
    private page: Page;
    private inputUsername: Locator;
    private inputPassword: Locator;
    private loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputUsername = page.getByPlaceholder('Username');
        this.inputPassword = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async setUsername(username: string): Promise<void> {
        await this.inputUsername.fill(username);
    }

    async setPassword(password: string): Promise<void> {
        await this.inputPassword.fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.clickLogin();
    }

}