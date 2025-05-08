const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('guardar-datos', async (event, datos) => {
  fs.writeFileSync('datos_usuario.json', JSON.stringify(datos, null, 2));
  return 'guardado';
});

ipcMain.handle('ejecutar-script', async (event, tipo) => {
  const comando = tipo === 'registro' ? 'node registro.js' : 'node login.js';
  return new Promise((resolve, reject) => {
    exec(comando, (error, stdout, stderr) => {
      if (error) reject(stderr || error.message);
      else resolve(stdout);
    });
  });
});