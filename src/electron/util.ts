import { ipcMain, WebContents } from "electron";

export function isDev(): boolean {
  //Used for toggling vites HMR and not just reflecting immediate changes in production
  return process.env.NODE_ENV === "development";
}
//keyof basically limits it to the left side of things basically like enum
// EventPayloadMapping[Key] is fetches the right entry
export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, () => {});
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}
