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

export interface PiiData {
  email: string;
  name: string;
  phone: string;
  token: string;
}

export interface LocationData {
  token: string;
  state: string;
  country: string;
  zipcode: string;
  job_title: string;
}

export interface UserData extends PiiData, LocationData {}

export interface RowProps {
  activeRow: string;
  data: PiiData & LocationData;
  isPrivateRegion: string;
  setActiveRow: (arg: string) => void;
}
