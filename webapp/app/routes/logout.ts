import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";
import { AppPaths } from "~/constants";
import { logout } from "~/sessions";

export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

export const loader: LoaderFunction = async () => {
  return redirect(AppPaths.Root);
};
