import { test, expect } from '@playwright/test';
import { text } from 'body-parser';
const Tesseract = require('tesseract.js');
import { TIMEOUT } from 'dns';
import { setTimeout } from 'timers';

test('Automate Google Search and About Us Page Actions', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.getByTitle('Search').fill('Kriyadocs')
  await page.keyboard.press('Enter');
  await page.locator('h3:has-text("Kriyadocs | Publishing Workflow")').click();
  const pageTitle = await page.title();
  console.log(`Title: ${pageTitle}`);
  
  await page.waitForFunction('document.readyState === "complete"');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  //await page.pause();
  await page.locator('.footer-content div:nth-child(5) a:nth-child(3)').click();

  const xpathExpression1 = await page.locator('xpath = /html/body/div[2]/div[2]/div/div/div[1]/div[1]/div[1]/div[2]/p');
  const paragraphsText1 = await xpathExpression1.textContent();
  console.log(`Our Vision : ${paragraphsText1}`);

  const xpathExpression2 = await page.locator('xpath = /html/body/div[2]/div[2]/div/div/div[1]/div[2]/div[1]/div[2]/p');
  const paragraphsText2 = await xpathExpression2.textContent();
  console.log(`Our Vision : ${paragraphsText2}`);

  const xpathExpression3 = await page.locator('xpath = /html/body/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div[2]/p');
  const paragraphsText3 = await xpathExpression3.textContent();
  console.log(`Our Purpose : ${paragraphsText3}`);
  

  await page.waitForTimeout(5000)

});
