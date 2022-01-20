import { ModalPaths } from "../constants";
import { DataCenter } from "../interfaces";

export const getModalId = (path: ModalPaths) => path.substring(1);

export const isEu = (region: string): boolean => region.includes("-eu-");

export const getRegionLabel = (dc: DataCenter): string => {
  const {
    locationInfo: { city, countrycode },
  } = dc;
  const label = `${city}, ${countrycode}`;
  return label;
};