import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import { useNavigate } from "react-router-dom";

import type { MetaFunction } from "remix";

import styles from "./tailwind.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  const navigate = useNavigate();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="mx-auto">
          <div className="h-36 bg-primary text-primary-content">
            <img
              src="macrometa-white-transparent.png"
              alt="Macrometa Image"
              className="object-scale-down h-24 w-96 mx-auto cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            />
            <div className="text-center">
              Addressbook with Data Privacy & Residency
            </div>
          </div>
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
