import { AppPaths, FormButtonActions, HttpMethods } from "~/constants";
import { useEffect, useState } from "react";
import { useFetcher } from "remix";
import RefreshSVG from "~/routes/components/svgs/refresh";
import ProgressModal from "./modals/progressModal";

export default () => {
  const [showMenu, setShowMenu] = useState(false);
  const fetcher = useFetcher();

  useEffect(() => {
    const {
      location: { pathname },
    } = window;

    pathname === AppPaths.UserManagement
      ? setShowMenu(true)
      : setShowMenu(false);
  });

  return (
    <div
      className={`h-32 flex-col justify-end ${
        showMenu ? "flex" : "hidden"
      }`}
    >
      <div className="flex flex-row mt-[49px]">
        <div className="flex-none">
          <fetcher.Form
            method={HttpMethods.Post}
            action={AppPaths.UserManagement}
            reloadDocument
          >
            <button
              className={`btn btn-square btn-ghost tooltip tooltip-right`}
              data-tip="Refresh Page"
              name={FormButtonActions.Name}
              value={FormButtonActions.RefreshPage}
              type="submit"
            >
              <RefreshSVG />
            </button>
          </fetcher.Form>
        </div>
      </div>
      {fetcher.state === "submitting" && <ProgressModal />}
    </div>
  );
};
