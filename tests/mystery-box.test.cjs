const {chromium}=require('C:/Users/cmntu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('file:///'+path.join(__dirname,'../index.html').replace(/\\/g,'/'));
 assert.equal(await page.locator('#homeGames button').count(),5);
 await page.locator('#soundBtn').click();
 await page.locator('#homeGames [data-standalone-game]').click();
 const game=page.frameLocator('.mystery-dialog iframe');
 await game.locator('#soundToggleBtn').waitFor();
 assert(await page.locator('.mystery-dialog').isVisible());
 assert.equal(await game.locator('#soundToggleBtn').getAttribute('aria-pressed'),'false');
 assert.equal(await game.locator('body').evaluate(()=>document.title),'Mystery Object');
 const missing=await game.locator('body').evaluate(async()=>{
   const paths=[...new Set([...document.documentElement.outerHTML.matchAll(/\.\/sounds\/[a-z]+\.mp3/g)].map(m=>m[0]))];
   return paths.length;
 });assert(missing>=6);
 for(const size of [{width:1440,height:900},{width:390,height:844}]){
  await page.setViewportSize(size);
  assert(await page.locator('.mystery-dialog button').isVisible());
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 await page.setViewportSize({width:1440,height:900});
 await game.locator('#soundToggleBtn').focus();
 await game.locator('#soundToggleBtn').press('Escape');
 await page.locator('.mystery-dialog').waitFor({state:'hidden'});
 await page.waitForFunction(()=>!document.querySelector('.mystery-dialog iframe').hasAttribute('src'));
 await page.locator('[data-category="games"]').click();
 assert.equal(await page.locator('#catalogItems [data-standalone-game]').count(),1);
 await page.locator('#catalogItems [data-standalone-game]').click();
 await game.locator('#soundToggleBtn').waitFor();
 await page.locator('.mystery-dialog button').click();
 await page.locator('#home').click();
 assert.equal(await page.locator('#homeGames [data-standalone-game]').count(),1);
 await page.locator('#homeGames button').first().click();
 assert(await page.locator('#landing').isVisible());
 assert.deepEqual(errors,[]);
 console.log('PASS: home/catalog launch, game load, sound preference, desktop/mobile, Escape/return cleanup, no duplicate cards, existing story gate, no JS errors.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
