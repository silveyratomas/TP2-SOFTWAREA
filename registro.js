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
    // Completar campos
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

    console.log("🧠 Completá el CAPTCHA...");

    // Esperar a que el botón se habilite
    await page.waitForFunction(() => {
      const btn = document.querySelector('button.js-recaptcha-button');
      return btn && !btn.disabled;
    }, { timeout: 120000 });

    console.log("✅ CAPTCHA validado, esperando 1 segundo...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera corta

    console.log("👉 Enviando formulario...");
    await page.click('button.js-recaptcha-button');

    // Esperar resultado: redirección o mensaje de error
    await page.waitForFunction(() => {
      return (
        window.location.href.includes('/account') ||
        document.querySelector('.notification-danger.notification-left')
      );
    }, { timeout: 30000 });

    const url = page.url();

    // Verificar si hubo error
    const error = await page.$eval(
      '.notification-danger.notification-left',
      el => el.innerText
    ).catch(() => null);

    let result;
    if (error) {
      result = `❌ Registro fallido: ${error}`;
    } else {
      const text = await page.evaluate(() => document.body.innerText);
      result = `✅ Registro procesado\nURL: ${url}\n\nContenido:\n${text.slice(0, 1000)}`;
    }

    fs.writeFileSync('registro_resultado.txt', result, 'utf-8');
    console.log("📄 Resultado guardado en registro_resultado.txt");

  } catch (err) {
    fs.writeFileSync('registro_resultado.txt', `❌ Error técnico: ${err.message}`, 'utf-8');
    console.error("❌ Error:", err.message);
  }

  await browser.close();
})();
