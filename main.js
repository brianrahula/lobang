const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const windowStateKeeper = require('electron-window-state');

app.disableHardwareAcceleration();
app.allowRendererProcessReuse = true;

function createWindow() {
    let mainWindowStateKeeper = windowStateKeeper('main');

    let win = new BrowserWindow({
        title: 'main',
        x: mainWindowStateKeeper.x,
        y: mainWindowStateKeeper.y,
        width: mainWindowStateKeeper.width,
        height: mainWindowStateKeeper.height,
        minHeight: 720,
        minWidth: 1080,
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    });
    mainWindowStateKeeper.manage(win);

    win.loadURL('http://sync-tube.de/create');

    win.webContents.on('did-finish-load', function(){
        console.log('did finish load');

        let currentURL = win.webContents.getURL();

        console.log(currentURL);

        fs.readFile(__dirname + '/block_content.css', "utf-8", function (error, data) {
            if (!error) {
                var formatedData = data.replace(/\s{2,10}/g, ' ').trim();
                win.webContents.insertCSS(formatedData);
            }
        });

        fs.readFile(__dirname + '/block_content.js', "utf-8", function (error, data) {
            if (!error) {
                win.webContents.executeJavaScript(data);
            }
        });

        setTimeout(() => {win.show()},500);

        
    })



    // win.webContents.openDevTools()
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});