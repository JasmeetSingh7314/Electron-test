import { app, BrowserWindow, ipcMain, session } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";

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

  ipcMain.handle("getStaticData", () => {
    return getStaticData();
  });
});
