import { test, expect } from '@playwright/test';

// Define test data
const testUser = {
  fullname: 'John Doe',
  email: 'john.doe@example.com',
  password: 'Test@1234',
  phone: '9876543210',
  address: '123 Main St, City, Country'
};

test.describe('Register Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('should display registration form', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Create an account');
    await expect(page.locator('input#fullName')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input#password')).toBeVisible();
    await expect(page.locator('input#phone')).toBeVisible();
    await expect(page.locator('input#address')).toBeVisible();
    await expect(page.locator('button[type=submit]')).toHaveText('Sign up');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.click('button[type=submit]');
    await expect(page.locator('#fullName:invalid')).toBeVisible();
    await expect(page.locator('#email:invalid')).toBeVisible();
    await expect(page.locator('#password:invalid')).toBeVisible();
    await expect(page.locator('#phone:invalid')).toBeVisible();
    await expect(page.locator('#address:invalid')).toBeVisible();
  });

  test('should allow user to fill and submit the form', async ({ page }) => {
    await page.fill('#fullName', testUser.fullname);
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.fill('#phone', testUser.phone);
    await page.fill('#address', testUser.address);
    
    await page.click('button[type=submit]');
    
    await expect(page).not.toHaveURL('/register'); // Redirect should happen
  });

  test('should show error message if registration fails', async ({ page }) => {
    await page.fill('#fullName', ''); // Empty name to trigger an error
    await page.fill('#email', testUser.email);
    await page.fill('#password', testUser.password);
    await page.fill('#phone', testUser.phone);
    await page.fill('#address', testUser.address);
    
    await page.click('button[type=submit]');
    
    await expect(page.locator('text=Error')).toBeVisible();
  });
});
