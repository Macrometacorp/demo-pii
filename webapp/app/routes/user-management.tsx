import { useEffect, useState } from "react";
import { LoaderFunction, useCatch, useLoaderData } from "remix";
import * as queryString from "query-string";

import { Fabrics, HEADINGS, Queries, SessionStorage } from "~/constants";
import { LocationData, PiiData, UserData } from "~/interfaces";
import { c8ql } from "~/utilities/REST/mm";
import EditModal from "./components/modals/editModal";
import RemoveModal from "./components/modals/removeModal";
import ShareModal from "./components/modals/shareModal";
import AddContactModal from "./components/modals/addContactModal";
import Row from "./components/tableRow";
import { piiSearch } from "~/utilities/REST/pii";
import Unauthorized from "./components/unauthorized";
import Error from "./components/error";
import { isLoggedIn } from "~/utilities/utils";

const handleSearch = async (request: Request, email: string) => {
  let result: Array<UserData> = [];
  let token;
  let user;
  // check PII
  const textRes = await piiSearch(email.toString())
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
  const userData = useLoaderData();
  const [activeRow, setActiveRow] = useState("");
  const [isPrivateRegion, setIsPrivateRegion] = useState("");
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
      <AddContactModal isPrivateRegion={isPrivateRegion} />
    </div>
  );
};

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 401) {
    return <Unauthorized />;
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <Error />;
}
