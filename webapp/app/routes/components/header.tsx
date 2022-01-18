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
    <div className="navbar mb-2 shadow-lg bg-primary text-neutral-content box h-32">
      <div className="flex-1"></div>
      <div className="flex-1 justify-center">
        <div>
          <img
            src="macrometa-white-transparent.png"
            alt="Macrometa Image"
            className="object-scale-down h-20 w-96 mx-auto cursor-pointer"
            onClick={() => {
              navigate(AppPaths.Root);
            }}
          />
          <div className="text-center">User Management Portal</div>
        </div>
      </div>
      <div className="flex-1 justify-end">{showMenu && <Menu />}</div>
    </div>
  );
};
