import { test, expect } from '@playwright/test'

test.describe('Health Charity - Non-Demo Mode', () => {
  test('homepage loads with hero content from Drupal', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toContainText('Every Heartbeat Matters')
    await expect(page.locator('body')).toContainText('Hope for a Healthier Tomorrow')
  })

  test('homepage displays stats section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toContainText('50,000+')
    await expect(page.locator('body')).toContainText('Lives Impacted')
  })

  test('homepage displays CTA section', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toContainText('Your Generosity Saves Lives')
  })

  test('campaigns listing page loads with content', async ({ page }) => {
    await page.goto('/campaigns')
    await expect(page).toHaveTitle(/Campaigns/)
    await expect(page.locator('body')).toContainText('Hearts for Hope')
    await expect(page.locator('body')).toContainText('Childhood Cancer Warriors')
    await expect(page.locator('body')).toContainText('Mind Matters Initiative')
    await expect(page.locator('body')).toContainText('Step Up for Diabetes')
  })

  test('campaign detail page loads via slug', async ({ page }) => {
    await page.goto('/campaigns/hearts-for-hope')
    await expect(page.locator('body')).toContainText('Hearts for Hope')
    await expect(page.locator('body')).toContainText('cardiac research')
  })

  test('research listing page loads with content', async ({ page }) => {
    await page.goto('/research')
    await expect(page).toHaveTitle(/Research/)
    await expect(page.locator('body')).toContainText('Regenerative Cardiac Tissue Therapy')
    await expect(page.locator('body')).toContainText('Pediatric Immunotherapy')
  })

  test('research detail page loads via slug', async ({ page }) => {
    await page.goto('/research/regenerative-cardiac-therapy')
    await expect(page.locator('body')).toContainText('Regenerative Cardiac Tissue Therapy')
    await expect(page.locator('body')).toContainText('Dr. Elena Rodriguez')
  })

  test('events listing page loads with content', async ({ page }) => {
    await page.goto('/events')
    await expect(page).toHaveTitle(/Events/)
    await expect(page.locator('body')).toContainText('Annual Hope Gala 2026')
    await expect(page.locator('body')).toContainText('Heart & Hope 5K Walk/Run')
  })

  test('event detail page loads via slug', async ({ page }) => {
    await page.goto('/events/hope-gala-2026')
    await expect(page.locator('body')).toContainText('Annual Hope Gala 2026')
    await expect(page.locator('body')).toContainText('Grand Ballroom')
  })

  test('news listing page loads with content', async ({ page }) => {
    await page.goto('/news')
    await expect(page).toHaveTitle(/News/)
    await expect(page.locator('body')).toContainText('Foundation Receives $5M NIH Research Grant')
    await expect(page.locator('body')).toContainText('2025 Impact Report')
  })

  test('news detail page loads via slug', async ({ page }) => {
    await page.goto('/news/foundation-receives-nih-grant')
    await expect(page.locator('body')).toContainText('Foundation Receives $5M NIH Research Grant')
    await expect(page.locator('body')).toContainText('National Institutes of Health')
  })

  test('about page loads via slug routing', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('body')).toContainText('About Heart & Hope Health Foundation')
    await expect(page.locator('body')).toContainText('501(c)(3)')
  })

  test('navigation header is present on all pages', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header, nav').first()
    await expect(header).toBeVisible()
  })
})
