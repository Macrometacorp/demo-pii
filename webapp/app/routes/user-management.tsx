import { useEffect, useState } from "react";
import {
  ActionFunction,
  LoaderFunction,
  useActionData,
  useCatch,
  useLoaderData,
} from "remix";
import * as queryString from "query-string";
import { v4 as uuidv4 } from "uuid";

import {
  CONTACTS_PER_PAGE,
  ActionButtons,
  Fabrics,
  HEADINGS,
  MM_TOKEN_PREFIX,
  Queries,
  SessionStorage,
  ToastTypes,
} from "~/constants";
import { LocationData, PiiData, UserData } from "~/interfaces";
import { c8ql } from "~/utilities/REST/mm";
import EditModal from "./components/modals/editModal";
import RemoveModal from "./components/modals/removeModal";
import ShareModal from "./components/modals/shareModal";
import AddContactModal from "./components/modals/addContactModal";
import Row from "./components/tableRow";
import { piiAddContact, piiSearchByEmail } from "~/utilities/REST/pii";
import Unauthorized from "./components/unauthorized";
import ErrorComponent from "./components/error";
import { isLoggedIn, isPrivateRegion } from "~/utilities/utils";
import DecryptedModal from "./components/modals/showDecryptedModal";
import { Pagination } from "./components/Pagination";
import Toast from "./components/toast";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name")?.toString() ?? "";
  const email = form.get("email")?.toString() ?? "";
  const phone = form.get("phone")?.toString() ?? "";
  const state = form.get("state")?.toString() ?? "";
  const country = form.get("country")?.toString() ?? "";
  const zipcode = form.get("zipcode")?.toString() ?? "";
  const job_title = form.get("job_title")?.toString() ?? "";

  try {
    const isPrivate = isPrivateRegion(country);
    let token;
    if (isPrivate) {
      const resText = await piiAddContact(name, email, phone).then((response) =>
        response.text()
      );
      const res = JSON.parse(resText);
      token = res.token;
    } else {
      token = `${MM_TOKEN_PREFIX}${uuidv4()}`;
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

const handleSearch = async (request: Request, email: string) => {
  let result: Array<UserData> = [];
  let token;
  let user;
  // check PII
  const textRes = await piiSearchByEmail(email.toString())
    .then((response) => response.text())
    .catch((err) => {
      return JSON.stringify({ error: true, message: err.message });
    });

  try {
    const res = JSON.parse(textRes);
    token = res?.token;
  } catch (error: any) {
    console.error(error);
  }
  if (!token) {
    // not found in PII, check users table
    const c8Res = await c8ql(
      request,
      Fabrics.Global,
      Queries.SearchUserByEmail,
      {
        email,
      }
    ).then((response) => response.json());
    user = c8Res?.result?.[0];
    token = user?.token as string;
  }
  if (token) {
    if (!user) {
      // this was from pii. Find user from the users table
      const c8Res = await c8ql(
        request,
        Fabrics.Global,
        Queries.SearchUserByToken,
        { token }
      ).then((response) => response.json());
      user = c8Res?.result?.[0] as PiiData;
    }

    // find location details for this token
    const locationRes = await c8ql(
      request,
      Fabrics.Global,
      Queries.SearchLocationByToken,
      { token }
    ).then((response) => response.json());
    const locationDetails = locationRes?.result?.[0] as LocationData;
    result = [
      {
        ...user,
        ...locationDetails,
      },
    ];
  } else {
    // did not find anything for this email
    console.log("--------NOT FOUND ANYWHERE----------");
  }
  console.log("--------FINAL----------");
  console.log(JSON.stringify(result));
  return result;
};
const handleList = async (request: Request) => {
  const getUsersPromise = c8ql(request, Fabrics.Global, Queries.GetUsers).then(
    (response) => response.json()
  );
  const getLocationsPromise = c8ql(
    request,
    Fabrics.Global,
    Queries.GetLocations
  ).then((response) => response.json());

  const allResponses = await Promise.all([
    getUsersPromise,
    getLocationsPromise,
  ]);

  const users: Array<UserData> = allResponses?.[0]?.result ?? [];
  const locations: Array<LocationData> = allResponses?.[1]?.result ?? [];

  const result = users?.map((user) => {
    const { token } = user;
    const location = locations.find((location) => location.token === token);
    return {
      ...user,
      ...location,
    };
  });
  return result;
};

export const loader: LoaderFunction = async ({ request }) => {
  if (!(await isLoggedIn(request))) {
    throw new Response("Unauthorized", { status: 401 });
  }
  const {
    query: { email },
  } = queryString.parseUrl(request.url);

  let result;
  if (email) {
    result = await handleSearch(request, email.toString());
  } else {
    result = await handleList(request);
  }
  return result;
};

export default () => {
  const actionData = useActionData();
  const userData = useLoaderData();
  const [activeRow, setActiveRow] = useState("");
  const [isPrivateRegion, setIsPrivateRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(CONTACTS_PER_PAGE);
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = userData.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const [showDecryptModal, setShowDecryptModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [modalUserDetails, setModalUserDetails] = useState({} as LocationData);

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
  useEffect(() => {
    setIsPrivateRegion(
      sessionStorage.getItem(SessionStorage.IsPrivateRegion) || ""
    );
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {HEADINGS.map((heading) => {
              const textStyle = heading === "actions" ? "text-center" : "";
              return (
                <th className={textStyle} key={heading}>
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((data: UserData) => (
            <Row
              key={data.token}
              activeRow={activeRow}
              setActiveRow={setActiveRow}
              data={data}
              isPrivateRegion={isPrivateRegion}
              onActionButtonClicked={(
                action: ActionButtons,
                details: LocationData
              ) => {
                setModalUserDetails(details);
                switch (action) {
                  case ActionButtons.Show:
                    setShowDecryptModal(true);
                    break;
                  case ActionButtons.Edit:
                    setShowEditModal(true);
                    break;
                }
              }}
            />
          ))}
        </tbody>
      </table>
      {showEditModal && (
        <EditModal
          modalUserDetails={modalUserDetails}
          onModalClose={() => {
            setShowEditModal(false);
          }}
        />
      )}
      <RemoveModal />
      <ShareModal />

      <AddContactModal />
      {showDecryptModal && (
        <DecryptedModal
          modalUserDetails={modalUserDetails}
          onModalClose={() => {
            setShowDecryptModal(false);
          }}
        />
      )}

      <Pagination
        contactsPerPage={contactsPerPage}
        totalContacts={userData.length}
        paginate={paginate}
        currentPage={currentPage}
      />

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
