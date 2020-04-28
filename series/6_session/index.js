var path = require('path'),
    {app, BrowserWindow} = require('electron');

app.on('ready', () => {
    var win = new BrowserWindow({
        height: 800,
        width: 1200,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // win.loadFile(path.join(__dirname, 'index.html'));
    win.loadURL('https://www.baidu.com');

    console.log(win.webContents.session);
    console.log(win.webContents.session.getUserAgent());
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
