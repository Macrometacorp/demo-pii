import { useEffect, useState } from "react";
import {
  ActionFunction,
  //   ActionFunction,
  LoaderFunction,
  useActionData,
  //   useActionData,
  useCatch,
  useLoaderData,
} from "remix";
import Unauthorized from "./components/unauthorized";
import ErrorComponent from "./components/error";
import { UserData, UserManagementActionResult } from "~/interfaces";
import { getAuthTokens } from "~/sessions";
import {
  AppPaths,
  Fabrics,
  FormButtonActions,
  Queries,
  Session,
  ToastTypes,
} from "~/constants";
import { isLoggedIn, isMMToken } from "~/utilities/utils";
import { c8ql } from "~/utilities/REST/mm";
import EditModal from "./components/modals/editModal";
import ShareModal from "./components/modals/shareModal";
import handleUpdate from "../utilities/REST/handlers/update";
import Toast from "./components/toast";

export const action: ActionFunction = async ({
  request,
}): Promise<UserManagementActionResult> => {
  const form = await request.formData();
  const actionType = form.get(FormButtonActions.Name)?.toString() ?? "";

  let result;
  switch (actionType) {
    case FormButtonActions.Update:
      result = await handleUpdate(request, form, true);
      break;
    // case FormButtonActions.Delete:
    //   result = await handleDelete(request, form);
    //   break;
    default:
      result = {
        error: true,
        name: "Form action",
        errorMessage: "Unhandled form action",
      };
  }

  return result;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { [Session.PiiToken]: piiToken } = await getAuthTokens(request);
  if (!(await isLoggedIn(request))) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const isPrivateRecord = !isMMToken(piiToken);

  const url = new URL(request.url);
  const { host, protocol } = url;
  const piiPromise = isPrivateRecord
    ? fetch(`${protocol}//${host}/decrypt?token=${piiToken}`).then((response) =>
        response.text()
      )
    : c8ql(
        request,
        Fabrics.Global,
        Queries.SearchUserByToken(),
        {
          token: piiToken,
        },
        true
      ).then((response) => response.json());

  const locationPromise = c8ql(
    request,
    Fabrics.Global,
    Queries.SearchLocationByToken(),
    { token: piiToken },
    true
  ).then((response) => response.json());

  const [piiResponse, locationResponse] = await Promise.all([
    piiPromise,
    locationPromise,
  ]);

  const parsedPiiResponse = isPrivateRecord
    ? JSON.parse(piiResponse)?.data
    : piiResponse?.result?.[0];
  const { state, country, zipcode, job_title } = locationResponse?.result?.[0];
  const { login, email, phone, name } = parsedPiiResponse;
  const decryptedData = {
    name: isPrivateRecord ? login : name,
    email,
    phone,
    state,
    country,
    zipcode,
    job_title,
    token: piiToken,
    isPrivateRecord,
  };
  return decryptedData;
};

export default () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  let toastType = ToastTypes.Info;
  let toastMessage = "";
  if (actionData) {
    const { error, isPrivate } = actionData;
    toastType = error
      ? ToastTypes.Error
      : isPrivate
      ? ToastTypes.Info
      : ToastTypes.Success;

    toastMessage = error
      ? `${error.name}: ${error.errorMessage}`
      : isPrivate
      ? "Your new record will reflect shortly"
      : "New record added successfully";
  }
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
          <button
            className="btn btn-outline btn-primary"
            disabled={!loaderData.isPrivateRecord}
          >
            Share
          </button>
          <button
            className="btn btn-outline btn-neutral"
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </button>
          <button className="btn btn-outline btn-error">Forget</button>
        </div>
      </div>
      {showEditModal && (
        <EditModal
          modalUserDetails={loaderData}
          onModalClose={() => {
            setShowEditModal(false);
          }}
          shouldDecrypt={false}
          formAction={AppPaths.UserDetails}
        />
      )}

      {showShareModal && (
        <ShareModal
          modalUserDetails={loaderData}
          onModalClose={() => {
            setShowShareModal(false);
          }}
        />
      )}
      {actionData && <Toast toastType={toastType} message={toastMessage} />}
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
