const os = require('os');
const electron = require('electron');
var path = require('path');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;

var mainWindow = null;
var tray = null;
// ./app/images/appIcon.png
var trayIcon = path.join(__dirname, 'app/images', 'appIcon.png');
var appIcon=trayIcon;
var isQuitting=false;

app.on('window-all-closed', function () {
    app.quit();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        title: 'AriaNg',
        width: 1000,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        webPreferences: {
            nodeIntegration: false
        },
        icon:appIcon
    });
    tray = new Tray(trayIcon);
	var contextMenu = Menu.buildFromTemplate([
	  { label: 'Show', click: function() {
        mainWindow.show();
        mainWindow.focus();
       } },
	  { label: 'Quit', click: function() { isQuitting=true;app.quit(); } }
	]);
	tray.setToolTip("Aria2Ng");
	tray.setContextMenu(contextMenu);
  
	tray.on('click', () => {
        mainWindow.show();
        mainWindow.focus();
    }
);

    if ( os.platform() == 'darwin' ){
         let template = [{
             label: "Application",
             submenu: [
                 { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
                 { type: "separator" },
                 { label: "Quit", accelerator: "CommandQ", click: function() { app.quit(); }}
             ]}, {
             label: "Edit",
             submenu: [
                 { label: "Undo", accelerator: "CmdOrCtrlZ", selector: "undo:" },
                 { label: "Redo", accelerator: "ShiftCmdOrCtrlZ", selector: "redo:" },
                 { type: "separator" },
                 { label: "Cut", accelerator: "CmdOrCtrlX", selector: "cut:" },
                 { label: "Copy", accelerator: "CmdOrCtrlC", selector: "copy:" },
                 { label: "Paste", accelerator: "CmdOrCtrlV", selector: "paste:" },
                 { label: "Select All", accelerator: "CmdOrCtrlA", selector: "selectAll:" }
             ]}
         ];
 
         Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    }

    mainWindow.setMenu(null);
    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    mainWindow.on('close', e => {
         if (!isQuitting) {
            e.preventDefault();
            mainWindow.hide();
           }
        //mainWindow = null;
    });
});
