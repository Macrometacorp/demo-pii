import { useState } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import * as queryString from "query-string";

import { Fabrics, HEADINGS, Queries, Session } from "~/constants";
import { LocationData, UserData } from "~/interfaces";
import { getSession } from "~/sessions";
import { c8ql } from "~/utils";
import EditModal from "./components/modals/editModal";
import RemoveModal from "./components/modals/removeModal";
import ShareModal from "./components/modals/shareModal";
import AddContactModal from "./components/modals/addContactModal";
import Row from "./components/tableRow";

export const loader: LoaderFunction = async ({ request }) => {
  const {
    query: { search },
  } = queryString.parseUrl(request.url);

  let getUsersPromise;

  if (search) {
    console.log(`Search::::${search}`);
    // getUsersPromise =
  } else {
    getUsersPromise = c8ql(request, Fabrics.Global, Queries.GetUsers).then(
      (response) => response.json()
    );
  }

  const getLocationsPromise = c8ql(
    request,
    Fabrics.Global,
    Queries.GetLocations
  ).then((response) => response.json());

  const allResponses = await Promise.all([
    getUsersPromise,
    getLocationsPromise,
  ]);

  const users: Array<UserData> = allResponses[0].result;
  const locations: Array<LocationData> = allResponses[1].result;

  const result = users.map((user) => {
    // FIXME: use actual token
    // const { token } = user;
    const token = "dummy";
    const location = locations.find((location) => location.token === token);
    return {
      ...user,
      ...location,
    };
  });

  return result;
};

export default function addressbook() {
  const userData = useLoaderData();
  const [activeRow, setActiveRow] = useState("");

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
          {userData.map((data: UserData) => (
            <Row
              key={data.token}
              activeRow={activeRow}
              setActiveRow={setActiveRow}
              data={data}
            />
          ))}
        </tbody>
      </table>
      <EditModal />
      <RemoveModal />
      <ShareModal />
      <AddContactModal />
    </div>
  );
}
