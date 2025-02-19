type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type View = "CPU" | "RAM" | "STORAGE";

//TypeSafe Adapters: which donot allow the types to escape .. also maintain type safety on both sides of bus
type EventPayloadMapping = {
  statistics: Statistics;
  staticData: StaticData;
  changeView: View;
};

type UnsubscribeFunction = () => void;

//appending the window type
interface Window {
  electron: {
    subscribeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscribeFunction;
    subscribeChangeView: (
      callback: (view: View) => void
    ) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
  };
}
