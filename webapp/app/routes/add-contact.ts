import { ActionFunction, redirect } from "remix";
import { v4 as uuidv4 } from "uuid";
import { AppPaths, Fabrics, Queries, SessionStorage } from "~/constants";
import { c8ql } from "~/utilities/REST/mm";
import { piiAddContact } from "~/utilities/REST/pii";
import { isPrivateRegion } from "~/utilities/utils";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name")?.toString() ?? "";
  const email = form.get("email")?.toString() ?? "";
  const phone = form.get("phone")?.toString() ?? "";
  const state = form.get("state")?.toString() ?? "";
  const country = form.get("country")?.toString() ?? "";
  const zipcode = form.get("zipcode")?.toString() ?? "";
  const job_title = form.get("job_title")?.toString() ?? "";

  // FIXME: remove checking for EU if not needed
  // const isPrivateRegion = form.get(SessionStorage.IsPrivateRegion) === "true";

  const isPrivate = isPrivateRegion(country);

  let token;
  if (isPrivate) {
    const resText = await piiAddContact(name, email, phone)
      .then((response) => response.text())
      .catch((err) => {
        console.error(err);
        return JSON.stringify({ error: true, message: err.message });
      });
    try {
      const res = JSON.parse(resText);
      token = res.token;
    } catch (error) {
      console.error(error);
    }
  } else {
    token = `mm_${uuidv4()}`;
    await c8ql(request, Fabrics.Global, Queries.UpsertUser, {
      token,
      name,
      email,
      phone,
    });
  }
  await c8ql(request, Fabrics.Global, Queries.UpsertLocation, {
    token,
    state,
    country,
    zipcode,
    job_title,
  });

  // FIXME: add way to show UI that success/error
  return redirect(AppPaths.UserManagement);
};
