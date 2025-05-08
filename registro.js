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
  await page.goto('https://bahamasstore.com.ar/account/register', { waitUntil: 'domcontentloaded' });

  try {
    await page.waitForSelector('input[name="name"]');
    await page.type('input[name="name"]', datos.nombre, { delay: 100 });
    await page.type('input[name="email"]', datos.email, { delay: 100 });
    await page.type('input[name="phone"]', datos.telefono, { delay: 100 });
    await page.type('input[name="password"]', datos.password, { delay: 100 });
    await page.type('input[name="password_confirmation"]', datos.password, { delay: 100 });

    // Cerrar popup si aparece
    try {
      await page.waitForSelector('#p-close', { timeout: 5000 });
      await page.click('#p-close');
      console.log("🧹 Popup cerrado.");
    } catch {
      console.log("ℹ️ No apareció popup.");
    }

    console.log("🧠 Esperá a completar el CAPTCHA...");

    await page.waitForFunction(() => {
      const btn = document.querySelector('button.js-recaptcha-button');
      return btn && !btn.disabled;
    }, { timeout: 120000 });

    console.log("✅ CAPTCHA validado. Haciendo clic...");
    await page.click('button.js-recaptcha-button');

    await page.waitForFunction(() => {
      return window.location.href.includes('/account') ||
             document.body.innerText.toLowerCase().includes('mi cuenta') ||
             document.body.innerText.toLowerCase().includes('gracias');
    }, { timeout: 30000 });

    const url = page.url();
    const text = await page.evaluate(() => document.body.innerText);
    const result = `✅ Registro procesado\nURL: ${url}\n\nContenido:\n${text.slice(0, 1000)}`;

    fs.writeFileSync('registro_resultado.txt', result, 'utf-8');
    console.log("✅ Registro finalizado");

  } catch (err) {
    fs.writeFileSync('registro_resultado.txt', `❌ Error: ${err.message}`, 'utf-8');
    console.error("❌ Error:", err.message);
  }

  await browser.close();
})();
