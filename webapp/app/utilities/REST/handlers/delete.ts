import { Fabrics, Queries } from "~/constants";
import { isPrivateRegion } from "~/utilities/utils";
import { c8ql } from "../mm";
import { piiDeleteUser } from "../pii";

export default async (request: Request, form: FormData) => {
  const token = form.get("token")?.toString() ?? "";
  const country = form.get("country")?.toString() ?? "";

  const isPrivate = isPrivateRegion(country);
  try {
    if (isPrivate) {
      const resText = await piiDeleteUser(token).then((response) =>
        response.text()
      );
      // error if expected format is not received
      JSON.parse(resText);
    } else {
      await c8ql(request, Fabrics.Global, Queries.DeleteUser(), {
        token,
      });
    }
    await c8ql(request, Fabrics.Global, Queries.DeleteLocation(), {
      token,
    });
    return { isPrivate };
  } catch (error: any) {
    return { error: true, errorMessage: error?.message, name: error?.name };
  }
};
