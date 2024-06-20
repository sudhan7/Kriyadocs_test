import { test, expect, context } from '@playwright/test';
test('To verify whether the unvalidated references are tagged elements and displayed in white background color', async({browser}) => {
  const context = await browser.newContext()
  const page = await context.newPage();
  await page.goto("https://staging.kriyadocs.com/welcome");
  await page.locator("#username").fill("rsudhan2020@gmail.com");
  await page.locator("#password").fill("Sudhan@7");
  await page.keyboard.press('Enter');
  await page.waitForFunction('document.readyState === "complete"');

  //checking for the popup box 
  await page.waitForSelector('//*[@id="login-page"]/div/form/div/div[3]/div[2]/div/div[1]/span | //*[@id="customerSelectionDiv"]/div[1]/div[1]');

  if(await page.locator('.col.s6.confirmationPanel').isVisible()){
    await page.locator('.btn.waves-effect.waves-light.confirm').click();
  }
  await page.waitForSelector('.customerTitleDiv');

  //check if the home page is visible
  await expect(page.locator('.customerTitleDiv')).toHaveText('Select a customer');

  //go to lithosphere and check if the page is visible
  const spanlocator = page.locator('.card p:nth-child(2) span',{ hasText: 'gsw' });
  await expect(spanlocator).toHaveCount(1);
  await expect(spanlocator).toHaveText('gsw');
  await spanlocator.click();
  await page.waitForSelector(".articleFilteredCard.articleDetailed.articles.mt-1 .manuscriptTitle:nth-child(1)");

  //enter id and search
  const classlocator = page.locator('.articleFilteredCard.articleDetailed.articles.mt-1 .manuscriptTitle:nth-child(1)',{ hasText: 'qwerty-2024' });
  await expect(classlocator).toHaveCount(1);
  await expect(classlocator).toHaveText('qwerty-2024');
  await classlocator.click();
  await page.waitForSelector(".rightSideBarHeader .editable");
  const edit = page.locator(".rightSideBarHeader .editable");

  // // Wait for the new page to open
  const pagePromise = context.waitForEvent('page');
  await edit.click();
  const newPage = await pagePromise;
  await expect(newPage).toHaveTitle("Kriyadocs | Review Contents");

  //after page opened click SC in the popup box
  await newPage.waitForFunction('document.readyState === "complete"');
  await newPage.waitForSelector(".row .btn.btn-small.indigo.structure-content.lighten-2");
  const newpage = newPage.locator(".row .btn.btn-small.indigo.structure-content.lighten-2");
  await newpage.click();
  await newPage.waitForTimeout(100000);
  
  //await newPage.waitForSelector(".pre-loader-message:has-text('Validating Reference through Biblio Service ...')")
  //await expect(newPage.waitForSelector('.pre-loader-message')).toHaveText('Validating Reference through Biblio Service ...');

  const validatedElements = await newPage.locator(`.back .jrnlRefText[data-id="R9"]`).elementHandles();
  for (const element of validatedElements) {
    const backgroundColor = await newPage.evaluate(el => getComputedStyle(el).backgroundColor, element);
    expect(backgroundColor).toBe('rgba(0, 0, 0, 0)');
}




  await page.waitForTimeout(3000);
})