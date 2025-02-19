import { app, BrowserWindow, ipcMain, Menu, session, Tray } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getAssetPath, getPreloadPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { menu } from "./menu.js";

// Menu.setApplicationMenu(null);
app.on("ready", () => {
  //Preferences limit the way we can
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    //Running the HMR build for development
    //Routed directly to the local vite server
    mainWindow.loadURL("http://localhost:5123");
  } else {
    //Running the Production Build
    mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
  }

  //Checking resource-usage

  pollResources(mainWindow);

  ipcMainHandle("staticData", () => {
    return getStaticData();
  });

  createTray(mainWindow);

  handleCloseEvent(mainWindow);
  menu(mainWindow);
});

function handleCloseEvent(mainWindow: BrowserWindow) {
  let willClose = false;

  if (willClose) {
    return;
  }
  mainWindow.on("close", (e) => {
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });
  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}
