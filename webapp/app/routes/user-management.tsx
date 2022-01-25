import { useEffect, useState } from "react";
import {
  ActionFunction,
  LoaderFunction,
  useActionData,
  useCatch,
  useLoaderData,
} from "remix";
import * as queryString from "query-string";

import {
  CONTACTS_PER_PAGE,
  ActionButtons,
  HEADINGS,
  SessionStorage,
  ToastTypes,
  FormButtonActions,
  AppPaths,
} from "~/constants";

import { UserData, UserManagementActionResult } from "~/interfaces";
import { isLoggedIn } from "~/utilities/utils";

import EditModal from "./components/modals/editModal";
import RemoveModal from "./components/modals/removeModal";
import ShareModal from "./components/modals/shareModal";
import AddContactModal from "./components/modals/addContactModal";
import Row from "./components/tableRow";
import Unauthorized from "./components/unauthorized";
import ErrorComponent from "./components/error";
import DecryptedModal from "./components/modals/showDecryptedModal";
import { Pagination } from "./components/Pagination";
import Toast from "./components/toast";

import handleCreate from "../utilities/REST/handlers/create";
import handleUpdate from "../utilities/REST/handlers/update";
import handleDelete from "../utilities/REST/handlers/delete";
import handleUpload from "../utilities/REST/handlers/upload";
import handleList from "../utilities/REST/handlers/list";
import handleSearch from "../utilities/REST/handlers/search";

export const action: ActionFunction = async ({
  request,
}): Promise<UserManagementActionResult> => {
  const form = await request.formData();
  const actionType = form.get(FormButtonActions.Name)?.toString() ?? "";

  let result;
  switch (actionType) {
    case FormButtonActions.Create:
      result = await handleCreate(request, form);
      break;
    case FormButtonActions.Update:
      result = await handleUpdate(request, form);
      break;
    case FormButtonActions.Delete:
      result = await handleDelete(request, form);
      break;
    case FormButtonActions.Upload:
      result = await handleUpload(request, form);
      break;
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
  const allUserData = useLoaderData();
  const userData = allUserData.filter((user: UserData) => !!user?.name?.trim());
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
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [modalUserDetails, setModalUserDetails] = useState({} as UserData);

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
                details: UserData
              ) => {
                setModalUserDetails(details);
                switch (action) {
                  case ActionButtons.Show:
                    setShowDecryptModal(true);
                    break;
                  case ActionButtons.Edit:
                    setShowEditModal(true);
                    break;
                  case ActionButtons.Remove:
                    setShowRemoveModal(true);
                    break;
                  case ActionButtons.Share:
                    setShowShareModal(true);
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
          formAction={AppPaths.UserManagement}
          onModalClose={() => {
            setShowEditModal(false);
          }}
        />
      )}

      {showRemoveModal && (
        <RemoveModal
          modalUserDetails={modalUserDetails}
          onModalClose={() => {
            setShowRemoveModal(false);
          }}
        />
      )}

      {showShareModal && (
        <ShareModal
          modalUserDetails={modalUserDetails}
          onModalClose={() => {
            setShowShareModal(false);
          }}
        />
      )}
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
