var
    path = require('path'),
    {app, BrowserWindow, Menu, dialog} = require('electron');

if (!app.requestSingleInstanceLock()) {
    dialog.showErrorBox('', '仅允许开启一个');
    app.quit()
}

app.on('ready', () => {
    var win = new BrowserWindow({
        height: 800,
        width: 1200,
        webPreferences: {
            nodeIntegration: true
        },
        // title: '菜单模块',  // 当页面没有title的时候，可以在此处添加。但渲染进程中的优先级高一些
        // icon: 'icon.png'  // 可以指定 图标
    });

    win.loadFile(path.join(__dirname, 'index.html'));

    const isMac = process.platform === 'darwin';
    const template = [
        // { role: 'appMenu' }
        ...(isMac ? [{
            label: app.name,
            submenu: [
                {
                    label: '陈子昂',
                    role: 'about'
                },
                {type: 'separator'},
                {role: 'services'},
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideothers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        }] : []),
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
                isMac ? {role: 'close'} : {role: 'quit'}
            ]
        },
        // { role: 'editMenu' }
        {
            label: 'Edit',
            submenu: [
                {
                    label: '陈子昂',
                    role: 'undo',
                    accelerator: 'Ctrl+Q'
                },
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                ...(isMac ? [
                    {role: 'pasteAndMatchStyle'},
                    {role: 'delete'},
                    {role: 'selectAll'},
                    {type: 'separator'},
                    {
                        label: 'Speech',
                        submenu: [
                            {role: 'startspeaking'},
                            {role: 'stopspeaking'}
                        ]
                    }
                ] : [
                    {role: 'delete'},
                    {type: 'separator'},
                    {role: 'selectAll'}
                ])
            ]
        },
        // { role: 'viewMenu' }
        {
            label: 'ViewCza',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {role: 'toggledevtools'},
                {type: 'separator'},
                {role: 'resetzoom'},
                {role: 'zoomin'},
                {role: 'zoomout'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        // { role: 'windowMenu' }
        {
            label: 'Window',
            submenu: [
                {role: 'minimize'},
                {role: 'zoom'},
                ...(isMac ? [
                    {type: 'separator'},
                    {role: 'front'},
                    {type: 'separator'},
                    {role: 'window'}
                ] : [
                    {role: 'close'}
                ])
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        const {shell} = require('electron');
                        await shell.openExternal('https://electronjs.org')
                    }
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

