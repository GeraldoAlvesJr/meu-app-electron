const { app, BrowserWindow, autoUpdater } = require('electron');

// Configuração do autoUpdater
const updateURL = 'https://github.com/GeraldoAlvesJr/meu-app-electron/releases/latest/download/latest.yml'; // A URL do arquivo de atualizações

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Carrega a URL ou arquivo HTML
    win.loadURL('index.html');
}

function checkForUpdates() {
    autoUpdater.setFeedURL(updateURL); // URL do feed de atualizações
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