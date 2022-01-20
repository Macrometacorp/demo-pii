export const piiSearch = (email: string) =>
  fetch(`${PRIVACY_SERVICE_URL}/v1/user/email/${email}`, {
    method: "GET",
    headers: {
      "X-Bunker-Token": DATABUNKER_ROOTTOKEN,
    },
  });

export const piiAddContact = (name: string, email: string, phone: string) => {
  const [first, last] = name.split(" ");

  return fetch(`${PRIVACY_SERVICE_URL}/v1/user`, {
    method: "POST",
    headers: {
      "X-Bunker-Token": DATABUNKER_ROOTTOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first,
      last,
      login: name,
      phone,
      email,
    }),
  });
};
