import { useState } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { Session } from "~/constants";
import { getSession } from "~/sessions";
import EditModal from "./components/editModal";
import RemoveModal from "./components/removeModal";
import ShareModal from "./components/shareModal";
import Row from "./components/tableRow";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const token = session.get(Session.Jwt);
  const tenant = session.get(Session.Tenant);

  const response = await fetch(
    `${FEDERATION_URL}/datacenter/_tenant/${tenant}`,
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }
  );
  const regions = await response.json();
  // return regions;
  return [
    {
      user_token: 1234,
      name: "abhishek",
      phone: "4321",
      email: "test@macrometa.com",
      city: "lko",
      zipcode: 226016,
    },
    {
      user_token: 1235,
      name: "abhishek",
      phone: "4321",
      email: "test@macrometa.com",
      city: "lko",
      zipcode: 226016,
    },
    {
      user_token: 1236,
      name: "abhishek",
      phone: "4321",
      email: "test@macrometa.com",
      city: "lko",
      zipcode: 226016,
    },
    {
      user_token: 1237,
      name: "abhishek",
      phone: "4321",
      email: "test@macrometa.com",
      city: "lko",
      zipcode: 226016,
    },
  ];
};

const HEADINGS = [
  "user token",
  "name",
  "phone",
  "email",
  "city",
  "zip code",
  "actions",
];

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
          {/* FIXME: proper interface */}
          {userData.map((data: any) => (
            <Row
              key={data.user_token}
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
    </div>
  );
}
