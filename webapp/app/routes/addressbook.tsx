import { useState } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { Session } from "~/constants";
import { getSession } from "~/sessions";

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
            <tr
              className={activeRow === data.user_token ? "active" : ""}
              onMouseEnter={() => {
                setActiveRow(data.user_token);
              }}
              onMouseLeave={() => {
                setActiveRow("");
              }}
              key={data.user_token}
            >
              <th>{data.user_token}</th>
              <td>{data.name}</td>
              <td>{data.phone}</td>
              <td>{data.email}</td>
              <td>{data.city}</td>
              <td>{data.zipcode}</td>
              <td className="flex">
                <a
                  href="#edit-modal"
                  className="flex-1 btn-sm btn-ghost text-blue-600 text-center leading-7"
                >
                  Edit
                </a>
                <a
                  href="#remove-modal"
                  className="flex-1 btn-sm btn-ghost text-red-600 text-center leading-7"
                >
                  Remove
                </a>
                <a
                  href="#share-modal"
                  className="flex-1 btn-sm btn-ghost text-green-600 text-center leading-7"
                >
                  Share
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="edit-modal" className="modal">
        <div className="modal-box">
          <p>
            Edit \n Enim dolorem dolorum omnis atque necessitatibus. Consequatur
            aut adipisci qui iusto illo eaque. Consequatur repudiandae et. Nulla
            ea quasi eligendi. Saepe velit autem minima.
          </p>
          <div className="modal-action">
            <a href="/components/modal#" className="btn btn-primary">
              Accept
            </a>
            <a href="/addressbook" className="btn">
              Close
            </a>
          </div>
        </div>
      </div>
      <div id="remove-modal" className="modal">
        <div className="modal-box">
          <p>
            Remove \n Enim dolorem dolorum omnis atque necessitatibus.
            Consequatur aut adipisci qui iusto illo eaque. Consequatur
            repudiandae et. Nulla ea quasi eligendi. Saepe velit autem minima.
          </p>
          <div className="modal-action">
            <a href="/components/modal#" className="btn btn-primary">
              Accept
            </a>
            <a href="/addressbook" className="btn">
              Close
            </a>
          </div>
        </div>
      </div>
      <div id="share-modal" className="modal">
        <div className="modal-box">
          <p>
            Share \n Enim dolorem dolorum omnis atque necessitatibus.
            Consequatur aut adipisci qui iusto illo eaque. Consequatur
            repudiandae et. Nulla ea quasi eligendi. Saepe velit autem minima.
          </p>
          <div className="modal-action">
            <a href="/components/modal#" className="btn btn-primary">
              Accept
            </a>
            <a href="/addressbook" className="btn">
              Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
