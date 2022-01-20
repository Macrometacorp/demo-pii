import { parse as parseCSV } from "papaparse";
import { Form } from "remix";
import { useNavigate } from "react-router-dom";
import { AppPaths, ModalPaths } from "~/constants";
import { useEffect, useState } from "react";

const FILE_SELECTOR_ID = "file-selector";
const LOGOUT_FORM_ID = "logout_form";

export default () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const {
      location: { pathname },
    } = window;

    pathname === AppPaths.UserManagement
      ? setShowMenu(true)
      : setShowMenu(false);
    setRegion(sessionStorage.getItem("region") || "");
  });
  return (
    <div
      className={`h-32 flex-col justify-center ${showMenu ? "flex" : "hidden"}`}
    >
      <div className="pb-2">
        Region: <span className="badge ml-2">{region}</span>
      </div>
      <div className="-mb-4 flex flex-row">
        <div className="flex-1 lg:flex-none">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search by email"
              className="input input-ghost"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-square btn-ghost tooltip"
            data-tip="Search"
            onClick={() => {
              navigate(`${AppPaths.UserManagement}?search=${search}`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>

        <div className="flex-none">
          <button
            className="btn btn-square btn-ghost tooltip"
            data-tip="Add Contact"
            onClick={() => {
              window.location.href = ModalPaths.AddContactModal;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="512"
              height="512"
              x="0"
              y="0"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <g>
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M18.581,2.14,12.316.051a1,1,0,0,0-.632,0L5.419,2.14A4.993,4.993,0,0,0,2,6.883V12c0,7.563,9.2,11.74,9.594,11.914a1,1,0,0,0,.812,0C12.8,23.74,22,19.563,22,12V6.883A4.993,4.993,0,0,0,18.581,2.14ZM20,12c0,5.455-6.319,9.033-8,9.889-1.683-.853-8-4.42-8-9.889V6.883A3,3,0,0,1,6.052,4.037L12,2.054l5.948,1.983A3,3,0,0,1,20,6.883Z"
                  fill="#ffffff"
                  data-original="#000000"
                />
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M15,10H13V8a1,1,0,0,0-2,0v2H9a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V12h2a1,1,0,0,0,0-2Z"
                  fill="#ffffff"
                  data-original="#000000"
                />
              </g>
            </svg>
          </button>
        </div>

        <div className="flex-none">
          <input
            className="hidden"
            type="file"
            id={FILE_SELECTOR_ID}
            onChange={(event) => {
              const file = event.target.files?.[0] || "";
              parseCSV(file, {
                complete: (results) => {
                  console.log(results);
                },
              });
            }}
          />
          <button
            className="btn btn-square btn-ghost tooltip"
            data-tip="Upload CSV"
            onClick={() => {
              document.getElementById(FILE_SELECTOR_ID)?.click();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0"
              y="0"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current opacity-95"
            >
              <g>
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M18.4,7.379a1.128,1.128,0,0,1-.769-.754h0a8,8,0,1,0-15.1,5.237A1.046,1.046,0,0,1,2.223,13.1,5.5,5.5,0,0,0,.057,18.3,5.622,5.622,0,0,0,5.683,23H11a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H5.683a3.614,3.614,0,0,1-3.646-2.981,3.456,3.456,0,0,1,1.376-3.313A3.021,3.021,0,0,0,4.4,11.141a6.113,6.113,0,0,1-.073-4.126A5.956,5.956,0,0,1,9.215,3.05,6.109,6.109,0,0,1,9.987,3a5.984,5.984,0,0,1,5.756,4.28,2.977,2.977,0,0,0,2.01,1.99,5.934,5.934,0,0,1,.778,11.09.976.976,0,0,0-.531.888h0a.988.988,0,0,0,1.388.915c4.134-1.987,6.38-7.214,2.88-12.264A6.935,6.935,0,0,0,18.4,7.379Z"
                  fill="#ffffff"
                  data-original="#000000"
                />
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M18.707,16.707a1,1,0,0,0,0-1.414l-1.586-1.586a3,3,0,0,0-4.242,0l-1.586,1.586a1,1,0,0,0,1.414,1.414L14,15.414V23a1,1,0,0,0,2,0V15.414l1.293,1.293a1,1,0,0,0,1.414,0Z"
                  fill="#ffffff"
                  data-original="#000000"
                />
              </g>
            </svg>
          </button>
        </div>
        <div className="flex-none dropdown dropdown-end">
          <button
            className="btn btn-square btn-ghost tooltip tooltip-left"
            data-tip="Account Options"
          >
            <img src="macrometa-icon.png" className="w-6 h-6 m-1" />
          </button>
          <Form
            action={AppPaths.Logout}
            method="post"
            id={LOGOUT_FORM_ID}
          ></Form>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content bg-primary rounded-box w-52"
          >
            <li
              onClick={() => {
                navigate(AppPaths.Region);
              }}
            >
              <a>Change Region</a>
            </li>
            <li
              onClick={() => {
                (
                  document.getElementById(LOGOUT_FORM_ID) as HTMLFormElement
                ).submit();
              }}
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
