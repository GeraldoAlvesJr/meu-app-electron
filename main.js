const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

// Configuração do autoUpdater
const updateURL = 'https://github.com/GeraldoAlvesJr/meu-app-electron/releases/latest/download/latest.yml'; // A URL do arquivo de atualizações

autoUpdater.autoDownload = false;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Carrega a URL ou arquivo HTML
    win.loadFile('index.html');
}

function checkForUpdates() {
    autoUpdater.setFeedURL(updateURL); // Define a URL do feed de atualizações
    autoUpdater.checkForUpdatesAndNotify(); // Verifica se há atualizações e notifica
}

autoUpdater.on('update-available', (info) => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Atualização Disponível',
        message: 'Uma nova versão está disponível. Deseja baixar agora?',
        buttons: ['Sim', 'Mais tarde']
    }).then(result => {
        if (result.response === 0) {
            autoUpdater.downloadUpdate();
        }
    });
});

autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Atualização Pronta',
        message: 'A atualização foi baixada. O aplicativo será reiniciado para aplicar as mudanças.',
        buttons: ['Reiniciar Agora']
    }).then(() => {
        autoUpdater.quitAndInstall();
    });
});

app.on('ready', () => {
    createWindow();
    checkForUpdates();
});