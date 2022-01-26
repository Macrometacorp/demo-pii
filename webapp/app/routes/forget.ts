import { ActionFunction, json, LoaderFunction } from "remix";
import { HttpMethods, Session } from "~/constants";
import handleDelete from "../utilities/REST/handlers/delete";

export const action: ActionFunction = async ({ request }) => {
  const { method } = request;
  if (method.toLowerCase() !== HttpMethods.Delete) {
    return json({ message: "Method not allowed" }, 405);
  }
  const token = request.headers.get(Session.PiiToken) || "";
  if (!token) {
    return json({ message: "PII token not present. Unauthorized" }, 401);
  }

  const formData = new FormData();
  formData.set("token", token);
  const res = await handleDelete(request, formData, true);
  return json(res, res.error ? 500 : 200);
};

export const loader: LoaderFunction = () => {
  return json({ message: "Method not allowed" }, 405);
};
