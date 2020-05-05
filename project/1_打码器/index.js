var {
        app,
        BrowserWindow,
        dialog
    } = require('electron'),
    path = require('path'),
    fs = require('fs');


if (!app.requestSingleInstanceLock()) app.quit();

app.on('ready', () => {
    var win = new BrowserWindow({
        height: 300,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile(path.join(__dirname, 'index.html'));
    const menu = Menu.buildFromTemplate([
        {
            label: '设置',
            submenu: [
                {
                    label: '指定输入',
                    check(){}
                },
                {
                    label: '指定输出'
                }
            ]
        }
    ]);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
