import puppeteer from 'puppeteer';

async function checkDevTools() {
  console.log('--- Launching Chrome via Puppeteer DevTools ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set mobile device viewport (iPhone 14 / Pixel 7 dimensions)
  await page.setViewport({
    width: 390,
    height: 844,
    isMobile: true,
    hasTouch: true
  });

  const consoleLogs = [];
  const errors = [];

  page.on('console', msg => {
    const text = `[Console ${msg.type()}]: ${msg.text()}`;
    console.log(text);
    consoleLogs.push(text);
  });

  page.on('pageerror', err => {
    const text = `[Page Error]: ${err.toString()}`;
    console.error(text);
    errors.push(text);
  });

  page.on('requestfailed', req => {
    console.warn(`[Network Failed]: ${req.url()} - ${req.failure()?.errorText}`);
  });

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 15000 });

  // Wait 1 second for Ionic animations
  await new Promise(r => setTimeout(r, 1000));

  // Inspect page title and rendered HTML
  const title = await page.title();
  console.log('Page Title:', title);

  // Check if IonTabs and Video Cards rendered
  const stats = await page.evaluate(() => {
    return {
      hasIonApp: !!document.querySelector('ion-app'),
      hasIonTabs: !!document.querySelector('ion-tabs'),
      hasIonTabBar: !!document.querySelector('ion-tab-bar'),
      tabButtonsCount: document.querySelectorAll('ion-tab-button').length,
      videoCardsCount: document.querySelectorAll('img[src*="unsplash"]').length,
      categoryChipsCount: document.querySelectorAll('.category-chip').length,
      headerTitle: document.querySelector('.yt-logo-text')?.textContent?.trim(),
      bodyInnerHTMLSnippet: document.body.innerHTML.slice(0, 500)
    };
  });

  console.log('\n--- DevTools Inspection Results ---');
  console.log('Render Stats:', JSON.stringify(stats, null, 2));
  console.log('Errors Count:', errors.length);
  console.log('Logs Count:', consoleLogs.length);

  // Take screenshot
  await page.screenshot({ path: 'dev_mobile_view.png', fullPage: false });
  console.log('Screenshot saved to dev_mobile_view.png');

  await browser.close();
}

checkDevTools().catch(err => {
  console.error('Fatal Test Error:', err);
  process.exit(1);
});
