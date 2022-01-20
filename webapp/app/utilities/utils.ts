import { ModalPaths } from "../constants";
import { DataCenter } from "../interfaces";
import EuroCountries from "./euro-countries";

export const getModalId = (path: ModalPaths) => path.substring(1);

export const isEu = (region: string): boolean => region.includes("-eu-");

export const getRegionLabel = (dc: DataCenter): string => {
  const {
    locationInfo: { city, countrycode },
  } = dc;
  const label = `${city}, ${countrycode}`;
  return label;
};

export const isPrivateRegion = (country: string): boolean => {
  const found = EuroCountries.find(
    (countryDetail) =>
      countryDetail.name.toUpperCase() === country.toUpperCase() ||
      countryDetail.code.toUpperCase() === country.toUpperCase()
  );
  return !!found;
};
