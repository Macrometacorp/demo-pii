import { ActionFunction, Form, redirect, json, useActionData } from "remix";
import { Session } from "~/constants";
import { getSession, commitSession } from "../sessions";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const email = form.get("email");
  const fabric = form.get("fabric");
  const password = form.get("password");
  const content = form.get("content");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof email !== "string" ||
    typeof fabric !== "string" ||
    typeof fabric !== "string"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { email, password };

  // TODO: handle error
  const response = await fetch(`${FEDERATION_URL}/_open/auth`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const body = await response.json();
  const { jwt, tenant } = body;

  if (!jwt) {
    return json(body, { status: 401 });
  } else {
    session.set(Session.Jwt, jwt);
    session.set(Session.Tenant, tenant);
    return redirect(`/region`, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export default function Login() {
  const actionData = useActionData();
  return (
    <div className="card shadow-lg max-w-lg mx-auto mt-20 hover:shadow-2xl">
      <div className="card-body">
        <h2 className="card-title">Login</h2>
        <Form method="post">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="demo@macrometa.io"
              className="input input-primary input-bordered"
              defaultValue="demo@macrometa.io"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Fabric</span>
            </label>
            <input
              type="text"
              name="fabric"
              required
              placeholder="_system"
              className="input input-primary input-bordered"
              defaultValue="_system"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              required
              className="input input-primary input-bordered"
            />
          </div>
          <button type="submit" className="btn btn-outline btn-primary mt-6">
            Submit
          </button>
        </Form>
      </div>
      {actionData && (
        <div className="alert alert-error">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 mx-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              ></path>
            </svg>
            <label>{actionData?.errorMessage}</label>
          </div>
        </div>
      )}
    </div>
  );
}