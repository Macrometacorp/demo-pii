export const piiSearchByEmail = (email: string) =>
  fetch(`${PRIVACY_SERVICE_URL}/v1/user/email/${email}`, {
    method: "GET",
    headers: {
      "X-Bunker-Token": DATABUNKER_ROOTTOKEN,
    },
  });

export const piiGetUserByToken = (token: string) =>
  fetch(`${PRIVACY_SERVICE_URL}/v1/user/token/${token}`, {
    method: "GET",
    headers: {
      "X-Bunker-Token": DATABUNKER_ROOTTOKEN,
    },
  });

export const piiAddContact = (name: string, email: string, phone: string) => {
  return fetch(`${PRIVACY_SERVICE_URL}/v1/user`, {
    method: "POST",
    headers: {
      "X-Bunker-Token": DATABUNKER_ROOTTOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: name,
      phone,
      email,
    }),
  });
};

export const piiUpdateContact = (
  token: string,
  name: string,
  email: string,
  phone: string
) => {
  return fetch(`${PRIVACY_SERVICE_URL}/v1/user/token/${token}`, {
    method: "PUT",
    headers: {
      "X-Bunker-Token": DATABUNKER_ROOTTOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: name,
      phone,
      email,
    }),
  });
};

export const piiGetShareableToken = (token: string) =>
  fetch(`${PRIVACY_SERVICE_URL}/v1/sharedrecord/token/${token}`, {
    method: "POST",
    headers: {
      "X-Bunker-Token": DATABUNKER_ROOTTOKEN,
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      "fields":"email,login,first,last,phone"
    })
  });
