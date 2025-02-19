const electron = require("electron");

//Creating the Bi-directional bridge
//.exposeInMainWorld() just simply appends these to main window
//satisfies checks the type by typescript

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback) =>
    ipcOn("statistics", (stats) => {
      callback(stats);
    }),
  getStaticData: () => ipcInvoke("staticData"),
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
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
  // electron.ipcRenderer.on(key, (payload:Statistics) => callback(payload));
}
