const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const  ipc = ipcMain;
const path_ = require('path');
function createWindow () {
    const win = new BrowserWindow({
      frame: true,
      width: 1024,
      height: 600,
      resizable: false,
      // skipTaskbar: true,
      autoHideMenuBar:true,
      // darkTheme: true,
      // navigateOnDragDrop: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        preload: path_.join(__dirname, 'preload.js'),
      }
    })
    
    win.loadFile('src/index.html');
    win.on('app-command', (e, cmd) => {
      // Navigate the window back when the user hits their mouse back button
      if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
        win.webContents.goBack()
      }
    });
    ipc.on('closeApp', () => {
      win.close();
    });

    ipc.on('minimizeApp', ()=> {
      win.minimize();
    });

    ipc.on('navToGoogleDive', ()=> {
      win.loadURL('https://drive.google.com/drive/u/0/my-drive');
    })
  }

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })