var
    path = require('path'),
    {app, Menu, Tray, BrowserWindow} = require('electron');

/*
* 系统托盘，就是右下角那个位置的图标，像华为那种一键拖过去上传的，似乎也可以实现
* 不过这个样式好丑，这种都是系统原生的样式嘛，如何修改
* 看源码??
* */

var tray = null;

app.on('ready', () => {
    tray = new Tray('icon.png');
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Item1',
            type: 'radio',
            // icon: 'icon.png'  // 可以设置托盘前面的图标
        },
        {label: 'Item2', type: 'radio'},
        {label: 'Item3', type: 'radio', checked: true},
        {label: 'Item4', type: 'radio'}
    ]);
    tray.setToolTip('This is my application.');  // 鼠标停留时的显示
    tray.setContextMenu(contextMenu);

    var win = new BrowserWindow({
        height: 800,
        width:1200,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadFile(path.join(__dirname, 'index.html'));
});


