import { useEffect, useState } from "react";

export function useView() {
  const [activeView, setActiveView] = useState<View>("CPU");
  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

  return activeView;
}
