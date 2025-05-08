const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  guardarDatos: (datos) => ipcRenderer.invoke('guardar-datos', datos),
  ejecutarScript: (tipo) => ipcRenderer.invoke('ejecutar-script', tipo)
});