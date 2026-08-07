import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(6200);

for (let y = 0; y < 3400; y += 300) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(150);
}

const heading = await page.$('text=New Arrivals');
await heading.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);

await page.screenshot({ path: 'C:/Users/User/AppData/Local/Temp/claude/d--Iqra-Optical/89404401-d5e7-4830-bb2d-32af0b747d30/scratchpad/new_arrivals.png' });

await browser.close();
console.log('done');
