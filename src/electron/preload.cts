const electron = require("electron");

//Creating the Bi-directional bridge
//.exposeInMainWorld() just simply appends these to main window
//satisfies checks the type by typescript

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) => {
    electron.ipcRenderer.on("statistics", (stats: any) => {
      callback(stats);
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
} satisfies Window["electron"]);

//On invoke of call
function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}

//On any event being called like a timeout
function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  electron.ipcRenderer.on(key, (payload: any) => callback(payload));
}
