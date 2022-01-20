import { createCookieSessionStorage, json, redirect } from "remix";
import { AppPaths, Session } from "./constants";
import { mmLogin } from "./utilities/REST/mm";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",
      // expires: new Date(Date.now() + 60),
      httpOnly: true,
      maxAge: 3600,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export const login = async (
  request: Request,
  email: FormDataEntryValue,
  password: FormDataEntryValue
) => {
  const session = await getSession(request.headers.get("Cookie"));
  const response = await mmLogin(email.toString(), password.toString());
  const body = await response.json();
  const { jwt, tenant } = body;

  if (!jwt) {
    return json(body, { status: 401 });
  } else {
    session.set(Session.Jwt, jwt);
    session.set(Session.Tenant, tenant);
    return redirect(AppPaths.Region, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export const logout = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect(AppPaths.Root, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export const getAuthTokens = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  return {
    [Session.Jwt]: session.get(Session.Jwt),
    [Session.Tenant]: session.get(Session.Tenant),
  };
};

export { getSession, commitSession, destroySession };
