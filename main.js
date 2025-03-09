const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

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
    
    // Abre o Developer Tools para debugar
    win.webContents.openDevTools();
}

function checkForUpdates() {
    autoUpdater.setFeedURL(updateURL); // Define a URL do feed de atualizações
    autoUpdater.checkForUpdatesAndNotify(); // Verifica se há atualizações e notifica
}

// Eventos do autoUpdater para depuração
autoUpdater.on('checking-for-update', () => {
    console.log('Verificando se há atualizações...');
});

autoUpdater.on('update-available', () => {
    console.log('Nova atualização disponível!');
});

autoUpdater.on('update-not-available', () => {
    console.log('Nenhuma atualização disponível.');
});

autoUpdater.on('error', (err) => {
    console.error('Erro ao verificar atualizações:', err);
});

autoUpdater.on('update-downloaded', () => {
    console.log('Atualização baixada! Instalação em andamento...');
    autoUpdater.quitAndInstall(); // Instala a atualização e fecha o app
});

app.whenReady().then(() => {
    createWindow();
    checkForUpdates(); // Verifica atualizações na inicialização
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});