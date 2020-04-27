var
    path = require('path'),
    {app, BrowserWindow} = require('electron');


app.on('ready', () => {
    var win = new BrowserWindow({
        height: 800,
        width: 800,
        webPreferences: {
            /* nodeIntegration
            * false: electron内置浏览器里面不会有module和require全局变量
            * */
            nodeIntegration: true
        }
    });
    win.loadFile(path.join(__dirname, 'index.html'));
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
