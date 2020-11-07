

const {app, BrowserWindow,ipcMain} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // 用户的require,process等变量的使用
      nodeIntegration:true,
      // 启用这个展示网页的标签
      webviewTag:true,
      enableRemoteModule: true, // 开启remote
    }
  })

  mainWindow.webContents.on("dom-ready",()=>{
    // console.log("8888")
  })




  mainWindow.loadFile('index.html')

}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// 主进程接受子进程的消息并返回
ipcMain.on("send-message-to-main-test",(event,args)=>{
  console.log("主进程接受到的数据是:",args)
  event.reply("send-message-to-renderer-test","这是来自"
  +"主进程的问候")
})

