var {
        app,
        BrowserWindow,
        dialog,
        Menu
    } = require('electron'),
    path = require('path');

if (!app.requestSingleInstanceLock()) {
    dialog.showErrorBox('', '仅允许开启一个');
    app.quit()
}

app.on('ready', () => {
    var win = new BrowserWindow({
        height: 900,
        width: 1200,
        webPreferences: {
            nodeIntegration: true
        },
    });
    win.loadFile(path.join(__dirname, 'index.html'));
    Menu.setApplicationMenu(null);
    win.webContents.openDevTools();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
