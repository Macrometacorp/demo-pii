import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "~/constants";
import Menu from "./menu";

export default () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const {
      location: { pathname },
    } = window;

    pathname === AppPaths.UserManagement
      ? setShowMenu(true)
      : setShowMenu(false);
  });
  return (
    <div className="navbar mb-2 shadow-lg bg-primary text-neutral-content box">
      <div className="mx-auto">
        <div className="h-32 bg-primary text-primary-content">
          <img
            src="macrometa-white-transparent.png"
            alt="Macrometa Image"
            className="object-scale-down h-24 w-96 mx-auto cursor-pointer"
            onClick={() => {
              navigate(AppPaths.Root);
            }}
          />
          <div className="text-center">User Management Portal</div>
        </div>
      </div>
      {showMenu && <Menu />}
    </div>
  );
};
