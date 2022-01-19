import { ModalPaths } from "./constants";

export const c8ql = (token: string, fabric: string, query: string) =>
  fetch(`${FEDERATION_URL}/_fabric/${fabric}/_api/cursor`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

export const getModalId = (path: ModalPaths) => path.substring(1);