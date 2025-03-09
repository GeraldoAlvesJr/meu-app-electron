const { app, BrowserWindow, autoUpdater } = require('electron');

// Configuração do autoUpdater
const updateURL = 'https://github.com/GeraldoAlvesJr/meu-app-electron/releases/latest/download/update.json'; // A URL do arquivo de atualizações

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Carrega a URL ou arquivo HTML
  win.loadURL('https://seu-endereco-de-web-ou-arquivo-local.html');
}

function checkForUpdates() {
  autoUpdater.setFeedURL(updateURL); // Define a URL de feed para as atualizações
  autoUpdater.checkForUpdatesAndNotify(); // Verifica se há atualizações e notifica
}

app.whenReady().then(() => {
  createWindow();
  checkForUpdates(); // Verifica atualizações na inicialização
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

// Quando a atualização for baixada
autoUpdater.on('update-downloaded', () => {
  console.log('Atualização baixada! Instalação em andamento...');
  autoUpdater.quitAndInstall(); // Instala a atualização e fecha o app
});
