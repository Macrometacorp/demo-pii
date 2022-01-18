import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";
import { AppPaths } from "~/constants";
import { logout } from "~/sessions";

export let action: ActionFunction = async ({ request }) => {
  return logout(request);
};

export let loader: LoaderFunction = async () => {
  return redirect(AppPaths.Root);
};
