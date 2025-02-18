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

//TypeSafe Adapters: which donot allow the types to escape .. also maintain type safety on both sides of bus
type EventPayloadMapping = {
  statistics: Statistics;
  staticData: StaticData;
};

//appending the window type
interface Window {
  electron: {
    subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
    getStaticData: () => Promise<StaticData>;
  };
}
