import { v4 as uuidv4 } from "uuid";

import { Fabrics, MM_TOKEN_PREFIX, Queries } from "~/constants";
import { isPrivateRegion } from "~/utilities/utils";
import { c8ql } from "../mm";
import { piiAddContact } from "../pii";

export const checkForDuplicateRecords = async (
  request: Request,
  name: string,
  email: string,
  phone: string,
  token: string = ""
) => {
  const duplicateRecordsPromise = await c8ql(
    request,
    Fabrics.Global,
    Queries.SearchDuplicateUser(),
    {
      name,
      email,
      phone,
      token,
    }
  );
  // fetching duplicate non eu records
  const duplicateRecords = await duplicateRecordsPromise.json();
  if (duplicateRecords.status === "error" || !duplicateRecords.result.length) {
    return;
  }
  const duplicateUser = duplicateRecords.result[0] || {};
  let errorMessage = "Something went wrong. Please try again.";
  if (duplicateUser.email === email) {
    errorMessage = `Contact already exists with email ${email}`;
  } else if (duplicateUser.name === name) {
    errorMessage = `Contact already exists with name ${name}`;
  } else if (duplicateUser.phone === phone) {
    errorMessage = `Contact already exists with phone ${phone}`;
  }
  throw new Error(errorMessage);
};

export default async (request: Request, form: FormData) => {
  const name = form.get("name")?.toString() ?? "";
  const email = form.get("email")?.toString() ?? "";
  const phone = form.get("phone")?.toString() ?? "";
  const state = form.get("state")?.toString() ?? "";
  const country = form.get("country")?.toString() ?? "";
  const zipcode = form.get("zipcode")?.toString() ?? "";
  const job_title = form.get("job_title")?.toString() ?? "";
  const isPrivate = isPrivateRegion(country);

  let token = "";
  try {
    if (isPrivate) {
      const piiResponsePromise = await piiAddContact(name, email, phone);
      const piiResponse = await piiResponsePromise.json();
      token = piiResponse.token;
      if (piiResponse?.status === "error") {
        let errorMessage = "Something went wrong. Please try again.";
        switch (piiResponse?.message) {
          case "duplicate index: email":
            errorMessage = `Contact already exists with email ${email}`;
            break;
          case "duplicate index: login":
            errorMessage = `Contact already exists with name ${name}`;
            break;
          case "duplicate index: phone":
            errorMessage = `Contact already exists with phone ${phone}`;
            break;
        }
        throw new Error(errorMessage);
      }
    } else {
      token = token || `${MM_TOKEN_PREFIX}${uuidv4()}`;
      await checkForDuplicateRecords(request, name, email, phone);
      await c8ql(request, Fabrics.Global, Queries.InsertUser(), {
        token,
        name,
        email,
        phone,
      });
    }
    await c8ql(request, Fabrics.Global, Queries.InsertLocation(), {
      token,
      state,
      country,
      zipcode,
      job_title,
    });
    return { isPrivate, isAdded: true };
  } catch (error: any) {
    return {
      error: true,
      errorMessage: error?.message,
      name: error?.name || "Error",
    };
  }
};
