var {
        app,
        BrowserWindow,
        Menu
    } = require('electron'),
    path = require('path');

if (!app.requestSingleInstanceLock()) app.quit();

app.on('ready', () => {
    var win = new BrowserWindow({
        height: 900,
        width: 1200,
        webPreferences: {
            nodeIntegration: true
        },
        // transparent: true,
        // frame: false
    });
    win.loadFile(path.join(__dirname, 'index.html'));
    Menu.setApplicationMenu(null);
    // win.webContents.openDevTools();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
