import type { LoaderFunction } from "remix";
import { piiGetShareableToken } from "~/utilities/REST/pii";
import * as queryString from "query-string";
import { sendMessage } from "../utilities/REST/twilio";

export const loader: LoaderFunction = async ({ request }) => {
  const {
    query: { token, phoneNumber = "" },
  } = queryString.parseUrl(request.url);
  const url = new URL(request.url);
  const { host, protocol } = url;
  if (!phoneNumber) {
    const result = await piiGetShareableToken(token?.toString() || "");
    const shareableTokenResult = await result.text();
    const parsedShareableTokenResult = JSON.parse(shareableTokenResult);

    return {
      ...parsedShareableTokenResult,
      privacy_service_url: `${protocol}//${host}`,
    };
  } else {
    const message = `curl -X 'GET' '${protocol}//${host}/details?token=${token}'`;
    const RECIPIENT = `+${phoneNumber?.toString()}`;
    let encoded = new URLSearchParams();
    encoded.append("To", RECIPIENT);
    encoded.append("From", TWILIO_NUMBER);
    encoded.append("Body", message);
    let result = await sendMessage(encoded);
    result = await result.json();
    return result;
  }
};
