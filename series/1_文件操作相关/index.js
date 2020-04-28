var
    path = require('path'),
    {app, BrowserWindow} = require('electron');

if (!app.requestSingleInstanceLock()) app.quit();  // 该程序仅能被实例一次

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
    // win.webContents.openDevTools();  // 默认打开开发者工具
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
