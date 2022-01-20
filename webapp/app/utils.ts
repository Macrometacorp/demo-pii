import { ModalPaths, Session } from "./constants";
import { DataCenter } from "./interfaces";
import { getAuthTokens } from "./sessions";

export const getDatacenters = async (request: Request) => {
  const { [Session.Jwt]: token, [Session.Tenant]: tenant } =
    await getAuthTokens(request);

  return fetch(`${FEDERATION_URL}/datacenter/_tenant/${tenant}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const c8ql = async (request: Request, fabric: string, query: string) => {
  const { [Session.Jwt]: token } = await getAuthTokens(request);
  return fetch(`${FEDERATION_URL}/_fabric/${fabric}/_api/cursor`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });
};

export const getModalId = (path: ModalPaths) => path.substring(1);

export const piiSearch = (email: string) =>
  fetch(`${PRIVACY_SERVICE_URL}/v1/user/email/${email}`, {
    method: "GET",
    headers: {
      "X-Bunker-Token": DATABUNKER_ROOTTOKEN,
    },
  });

export const isEu = (region: string): boolean => region.includes("-eu-");

export const getRegionLabel = (dc: DataCenter): string => {
  const {
    locationInfo: { city, countrycode },
  } = dc;
  const label = `${city}, ${countrycode}`;
  return label;
};

// curl -s ${DATABUNKER_URL}/v1/user/${WHAT}/${WHO} -H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" |jq
