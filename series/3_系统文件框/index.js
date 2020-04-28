var
    path = require('path'),
    {app, BrowserWindow, dialog} = require('electron');

app.on('ready', () => {
    var win = new BrowserWindow({
        height: 800,
        width: 700,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));
});

