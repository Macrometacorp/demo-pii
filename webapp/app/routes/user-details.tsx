import { useEffect, useState } from "react";
import {
  //   ActionFunction,
  LoaderFunction,
  //   useActionData,
  useCatch,
  useLoaderData,
} from "remix";
import Unauthorized from "./components/unauthorized";
import ErrorComponent from "./components/error";
import { UserData } from "~/interfaces";
import { getAuthTokens } from "~/sessions";
import { Fabrics, Queries, Session } from "~/constants";
import { isLoggedIn } from "~/utilities/utils";
import { c8ql } from "~/utilities/REST/mm";

export const loader: LoaderFunction = async ({ request }) => {
  const { [Session.PiiToken]: piiToken } = await getAuthTokens(request);
  if (!(await isLoggedIn(request))) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const { host, protocol } = url;
  const piiPromise = fetch(
    `${protocol}//${host}/decrypt?token=${piiToken}`
  ).then((response) => {
    return response.text();
  });

  const locationPromise = c8ql(
    request,
    Fabrics.Global,
    Queries.SearchLocationByToken,
    { token: piiToken },
    true
  ).then((response) => response.json());

  const [piiResponse, locationResponse] = await Promise.all([
    piiPromise,
    locationPromise,
  ]);

  const parsedPiiResponse = JSON.parse(piiResponse);
  const { state, country, zipcode, job_title } = locationResponse?.result?.[0];
  const { login, email, phone } = parsedPiiResponse?.data;
  const decryptedData = {
    name: login,
    email,
    phone,
    state,
    country,
    zipcode,
    job_title,
  };
  return decryptedData;
};

export default () => {
  const loaderData = useLoaderData();
  const { name, email, phone, state, country, zipcode, job_title } =
    loaderData as UserData;
  return (
    <div className="card text-center shadow-lg max-w-lg mx-auto mt-10 hover:shadow-2xl">
      <div className="card-body">
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            disabled
            value={name}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            disabled
            value={email}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="tel"
            name="phone"
            disabled
            value={phone}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">State</span>
          </label>
          <input
            type="text"
            name="state"
            disabled
            value={state}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Country</span>
          </label>
          <input
            type="text"
            name="country"
            disabled
            value={country}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Zipcode</span>
          </label>
          <input
            type="text"
            name="zipcode"
            disabled
            value={zipcode}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Job Title</span>
          </label>
          <input
            type="text"
            name="job_title"
            disabled
            value={job_title}
            className="input input-primary input-bordered"
          />
        </div>
        <div className="justify-center card-actions">
          <button className="btn btn-outline btn-primary">Share</button>
          <button className="btn btn-outline btn-neutral">Edit</button>
          <button className="btn btn-outline btn-error">Forget</button>
        </div>
      </div>
    </div>
  );
};

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return <Unauthorized />;
  } else {
    return <ErrorComponent />;
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <ErrorComponent />;
}
