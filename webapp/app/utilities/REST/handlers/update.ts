import { Fabrics, Queries } from "~/constants";
import { isPrivateRegion } from "~/utilities/utils";
import { c8ql } from "../mm";
import { piiUpdateContact } from "../pii";

export default async (request: Request, form: FormData) => {
  const name = form.get("name")?.toString() ?? "";
  const email = form.get("email")?.toString() ?? "";
  const phone = form.get("phone")?.toString() ?? "";
  const state = form.get("state")?.toString() ?? "";
  const country = form.get("country")?.toString() ?? "";
  const zipcode = form.get("zipcode")?.toString() ?? "";
  const job_title = form.get("job_title")?.toString() ?? "";

  const token = form.get("token")?.toString() ?? "";

  const isPrivate = isPrivateRegion(country);

  try {
    if (isPrivate) {
      const resText = await piiUpdateContact(token, name, email, phone).then(
        (response) => response.text()
      );
      // error if expected format is not received
      JSON.parse(resText);
    } else {
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
    return { isPrivate };
  } catch (error: any) {
    return { error: true, errorMessage: error?.message, name: error?.name };
  }
};
