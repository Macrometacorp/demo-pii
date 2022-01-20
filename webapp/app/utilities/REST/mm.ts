import { Session } from "~/constants";
import { getAuthTokens } from "~/sessions";

export const mmLogin = (email: string, password: string) =>
  fetch(`${FEDERATION_URL}/_open/auth`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

export const getDatacenters = async (request: Request) => {
  const { [Session.Jwt]: token, [Session.Tenant]: tenant } =
    await getAuthTokens(request);

  return fetch(`${FEDERATION_URL}/datacenter/_tenant/${tenant}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const c8ql = async (
  request: Request,
  fabric: string,
  query: string,
  bindVars: Record<string, unknown> = {}
) => {
  const { [Session.Jwt]: token } = await getAuthTokens(request);
  return fetch(`${FEDERATION_URL}/_fabric/${fabric}/_api/cursor`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ query, bindVars }),
  });
};
