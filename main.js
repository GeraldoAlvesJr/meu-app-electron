const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

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
    autoUpdater.checkForUpdates(); // Verifica se há atualizações e notifica
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