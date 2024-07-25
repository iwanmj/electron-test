import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const { clipboard } = require('electron')
const { BaseWindow, WebContentsView } = require('electron')

const {
  pingData
} = require("../../src/main/ping");

function createWindow() {
  const win = new BaseWindow({ width: 800, height: 600 })

  const leftView = new WebContentsView()
  leftView.webContents.loadURL('https://electronjs.org')
  win.contentView.addChildView(leftView)

  const rightView = new WebContentsView()
  rightView.webContents.loadURL('https://github.com/electron/electron')
  win.contentView.addChildView(rightView)

  leftView.setBounds({ x: 0, y: 0, width: 400, height: 600 })
  rightView.setBounds({ x: 400, y: 0, width: 400, height: 600 })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {

    console.log('this event is `browser-window-created`');
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => pingData())

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // app.on('browser-window-created', (_, window) => {
  //   event.preventDefault()
  // })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
// })


// app.on('window-all-closed', () => {
//   app.quit()
// })

// app.on('session-created', (session) => {
//   console.log(session)
// })

// clipboard.write({
//   text: 'test',
//   html: '<b>Hi</b>',
//   rtf: '{\\rtf1\\utf8 text}',
//   bookmark: 'a title'
// })

// console.log(clipboard.readText())
// 'test'

// console.log(clipboard.readHTML())
// <meta charset='utf-8'><b>Hi</b>

// console.log(clipboard.readRTF())
// '{\\rtf1\\utf8 text}'

// console.log(clipboard.readBookmark())
// { title: 'a title', url: 'test' }

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
