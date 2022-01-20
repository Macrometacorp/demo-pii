import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";
import { AppPaths } from "~/constants";
import { sendMessage } from "../utilities/REST/twilio";



export let action: ActionFunction = async ({ request }) => {
  const RECIPIENT= '+919554960514';
  const message=  `curl -X 'GET' \
    'https://api-smoke4.eng.macrometa.io/_api/key' \
    -H 'accept: application/json' \
    -H 'Authorization: '`
  let encoded = new URLSearchParams()
  encoded.append("To", RECIPIENT)
  encoded.append("From", "+19378822331")
  encoded.append("Body", message)

  let result = await sendMessage(encoded);
  result = await result.json()
console.log("result",result)
  return redirect(AppPaths.UserManagement)
};

export let loader: LoaderFunction = async () => {
  return redirect(AppPaths.UserManagement);
};
