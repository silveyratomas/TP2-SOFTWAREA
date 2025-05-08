const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());

const datos = JSON.parse(fs.readFileSync('datos_usuario.json', 'utf-8'));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();
  await page.goto('https://bahamasstore.com.ar/account/login', { waitUntil: 'domcontentloaded' });

  try {
    await page.waitForSelector('input[name="email"]', { timeout: 15000 });
    await page.type('input[name="email"]', datos.email, { delay: 100 });

    await page.waitForSelector('input[name="password"]', { timeout: 15000 });
    await page.type('input[name="password"]', datos.password, { delay: 100 });

    await page.waitForFunction(() => {
      return [...document.querySelectorAll('button')].some(btn =>
        btn.innerText.toLowerCase().includes('iniciar sesión'));
    }, { timeout: 15000 });

    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')]
        .find(b => b.innerText.toLowerCase().includes('iniciar sesión'));
      if (btn) btn.click();
    });

    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 });

    const url = page.url();
    const text = await page.evaluate(() => document.body.innerText);
    const result = `✅ Login exitoso\nURL: ${url}\n\nContenido:\n${text.slice(0, 1000)}`;

    fs.writeFileSync('login_resultado.txt', result, 'utf-8');
    console.log("✅ Login finalizado");

  } catch (err) {
    fs.writeFileSync('login_resultado.txt', `❌ Error: ${err.message}`, 'utf-8');
    console.error("❌ Error:", err.message);
  }

  await browser.close();
})();
