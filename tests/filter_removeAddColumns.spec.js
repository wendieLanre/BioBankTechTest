import { test, expect } from '@playwright/test';
import * as locator from '../locators/loctors.js';

   //Navigates to the homepage and clicks the performance tab just incase it isnt selected by default
test.beforeEach('Open start URL', async ({ page }) => {
  await page.goto('https://www.ag-grid.com/example/');
  await expect(page.locator(locator.performanceCard)).toHaveText('Performance');
  await page.locator(locator.performanceCard).click()
});
  //Checks that columns can be added and removed via the  column config panel
test('Remove and add participant header and columns', async ({ page }) => {
  await page.locator(locator.columnConfig_Name).click()
  await expect(page.locator(locator.name_Column)).toBeHidden()
  await page.locator(locator.columnConfig_Name).click()
  await expect(page.locator(locator.name_Column)).toBeVisible()
  await page.locator(locator.columnConfig_Language).click()
  await expect(page.locator(locator.language_Column)).toBeHidden()
  await page.locator(locator.columnConfig_Language).click()
  await expect(page.locator(locator.language_Column)).toBeVisible()
  await page.locator(locator.columnConfig_Country).click()
  await expect(page.locator(locator.country_Column)).toBeHidden()
  await page.locator(locator.columnConfig_Country).click()
  await expect(page.locator(locator.country_Column)).toBeVisible()

});
  //Filters participants based on language
test('Filter participant language', async ({ page }) => {
  await page.locator(locator.language_Input).click()
  await page.locator(locator.language_Input).fill('English')
  await page.waitForTimeout(2000);
  const languages = page.locator('//div[@col-id="language"]');
  const count = await languages.count();
  for (let i = 0; i < count; ++i)
  console.log(await languages.nth(i).textContent('English'));


});
  //Filters participants based on country
test('Filter participant country', async ({ page }) => {
  await page.locator(locator.country_Input).click()
  await page.waitForTimeout(1000);
  await page.locator(locator.countrySearch_SelectAll).click()
  await page.waitForTimeout(1000);
  await page.locator(locator.country_searchField).fill('Ireland')
  await page.waitForTimeout(1000);
  await page.locator(locator.countrySearch_SelectAll).click()
  await page.waitForTimeout(1000);
  const country = page.locator('//div[@col-id="country"]');
  const count = await country.count();
  for (let i = 0; i < count; ++i)
  console.log(await country.nth(i).textContent('Ireland'));

});
  //Checks that the column config panel can be hidden and displayed
test('Hide and display column config panel', async ({ page }) => {
  await page.locator(locator.column_configPanel_toggle).click()
  await expect(page.locator(locator.column_configPanel)).toBeHidden()
  await page.locator(locator.column_configPanel_toggle).click()
  await expect(page.locator(locator.column_configPanel)).toBeVisible()

});

