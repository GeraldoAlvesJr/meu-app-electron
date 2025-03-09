const { app, BrowserWindow, autoUpdater } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL('https://seu-endereco-de-web-ou-arquivo-local.html');
}

function checkForUpdates() {
  autoUpdater.checkForUpdatesAndNotify();
}

app.whenReady().then(() => {
  createWindow();
  checkForUpdates(); // Verificar atualizações na inicialização
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Quando a atualização estiver disponível
autoUpdater.on('update-available', () => {
  console.log('Nova atualização disponível!');
});

// Quando a atualização for instalada
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});