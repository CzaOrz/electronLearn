var
    path = require('path'),
    {app, BrowserWindow, ipcMain, webContents} = require('electron');

ipcMain.on('synchronous-message', (event, arg) => {
    event.returnValue = 'pong from synchronous';
});

ipcMain.on('asynchronous-message', (event, arg) => {
    event.reply('asynchronous-reply', 'pong from asynchronous');
});

ipcMain.handle('my-invokable-ipc',  (event, ...args) => {
    return "async func";
});

global.$data = {
    /*
    * 定义全局参数，则渲染进程可以通过 remote.getGlobal('$data') 拿到数据
    * */
    "status": 1,
    "msg": "this is a obj in main process",
    "data": []
};

app.allowRendererProcessReuse = true;
app.on('ready', () => {
    var win = new BrowserWindow({
        height: 800,
        width: 700,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    win.loadFile(path.join(__dirname, 'index.html'));

    /*
    * webContents 可以从electron中导入，也可以从win中引出，用于 渲染和控制 BrowserWindow 实例的内容
    * */
});

app.on('win-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});
