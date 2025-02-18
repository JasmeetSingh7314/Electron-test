export function isDev(): boolean {
  //Used for toggling vites HMR and not just reflecting immediate changes in production
  return process.env.NODE_ENV === "development";
}
