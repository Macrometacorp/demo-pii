export interface DataCenter {
  name: string;
  tags: {
    api: string;
  };
  locationInfo: {
    city: string;
    countrycode: string;
  };
}

export interface RegionInfo {
  dcInfo: Array<DataCenter>;
  tenant: string;
}

export interface RowProps {
  activeRow: string;
  // FIXME: proper types
  data: any;
  setActiveRow: (arg: string) => void;
}