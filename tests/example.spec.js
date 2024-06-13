import { test, expect } from '@playwright/test';

test('checking login and visibility', async({page}) => {

  await page.goto("https://staging.kriyadocs.com/welcome");
  await page.locator("#username").fill("rsudhan2020@gmail.com");
  await page.locator("#password").fill("Sudhan@7");
  //await page.locator('.btn.waves-effect.waves-light.col.s12').click();
  await page.keyboard.press('Enter');
  await page.waitForFunction('document.readyState === "complete"');

  await page.waitForSelector('//*[@id="login-page"]/div/form/div/div[3]/div[2]/div/div[1]/span | //*[@id="customerSelectionDiv"]/div[1]/div[1]');

  if(await page.locator('.col.s6.confirmationPanel').isVisible()){
    await page.locator('.btn.waves-effect.waves-light.confirm').click();
  }
  await page.waitForSelector('.customerTitleDiv');
  await expect(page.locator('.customerTitleDiv')).toHaveText('Select a customer');
  await page.waitForTimeout(3000);
});
