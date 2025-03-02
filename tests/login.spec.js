import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login'); // Update the URL as per your setup
  });

  test('should display the login page correctly', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Welcome back');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Sign in');
  });

  test('should allow user to enter email and password', async ({ page }) => {
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await expect(page.locator('input[type="email"]').inputValue()).resolves.toBe('test@example.com');
    await expect(page.locator('input[type="password"]').inputValue()).resolves.toBe('password123');
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('should log in successfully and redirect to homepage', async ({ page }) => {
    await page.fill('input[type="email"]', 'valid@example.com');
    await page.fill('input[type="password"]', 'correctpassword');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:3000/');
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('should show required field error when submitting empty form', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Enter your email')).toBeVisible();
    await expect(page.locator('text=Enter your password')).toBeVisible();
  });

  test('should open and close forgot password modal', async ({ page }) => {
    await page.click('text=Forgot your password?');
    await expect(page.locator('text=Reset Password')).toBeVisible();
    await page.click('button:has-text("Close")');
    await expect(page.locator('text=Reset Password')).not.toBeVisible();
  });
});
