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

export const piiSearch = (email: string)=> fetch(`${PRIVACY_SERVICE_URL}/v1/user/email/${email}`, {
  method: "GET",
  headers:{
    "X-Bunker-Token": DATABUNKER_ROOTTOKEN
  }
})

// curl -s ${DATABUNKER_URL}/v1/user/${WHAT}/${WHO} -H "X-Bunker-Token: $DATABUNKER_ROOTTOKEN" |jq
