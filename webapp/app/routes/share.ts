import type { LoaderFunction } from "remix";
import { piiGetShareableToken } from "~/utilities/REST/pii";
import * as queryString from "query-string";
import { sendMessage } from "../utilities/REST/twilio";

export const loader: LoaderFunction = async ({ request }) => {
  const {
    query: { token, phoneNumber = "" },
  } = queryString.parseUrl(request.url);
  if (!phoneNumber) {
    const result = await piiGetShareableToken(token?.toString() || "");
    const shareableTokenResult = await result.text();
    const parsedShareableTokenResult = JSON.parse(shareableTokenResult);

    return {
      ...parsedShareableTokenResult,
      privacy_service_url: PRIVACY_SERVICE_URL,
    };
  } else {
    const message = `curl --location --request GET ${PRIVACY_SERVICE_URL}/v1/get/${token}`;
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
