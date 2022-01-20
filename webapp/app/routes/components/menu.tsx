import { parse as parseCSV } from "papaparse";
import { Link } from "remix";
import { AppPaths, ModalPaths, SessionStorage } from "~/constants";
import { useEffect, useState } from "react";
import SearchSVG from "../components/svgs/search";
import ContactSVG from "../components/svgs/contact";
import UploadSVG from "../components/svgs/upload";

const FILE_SELECTOR_ID = "file-selector";

export default () => {
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
    setRegion(sessionStorage.getItem(SessionStorage.Region) || "");
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
          <Link
            to={
              search?.trim()
                ? `${AppPaths.UserManagement}?email=${search}`
                : AppPaths.UserManagement
            }
          >
            <button
              className="btn btn-square btn-ghost tooltip"
              data-tip="Search"
            >
              <SearchSVG />
            </button>
          </Link>
        </div>

        <div className="flex-none">
          <button
            className="btn btn-square btn-ghost tooltip"
            data-tip="Add Contact"
            onClick={() => {
              window.location.href = ModalPaths.AddContactModal;
            }}
          >
            <ContactSVG />
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
            <UploadSVG />
          </button>
        </div>
        <div className="flex-none dropdown dropdown-end">
          <button
            className="btn btn-square btn-ghost tooltip tooltip-left"
            data-tip="Account Options"
          >
            <img src="macrometa-icon.png" className="w-6 h-6 m-1" />
          </button>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content bg-primary rounded-box w-52"
          >
            <Link to={AppPaths.Region}>
              <li>
                <a>Change Region</a>
              </li>
            </Link>
            <Link to={AppPaths.Logout} reloadDocument>
              <li>
                <a>Logout</a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};
