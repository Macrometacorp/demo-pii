import { useLoaderData, Form } from "remix";
import { useNavigate } from "react-router-dom";
import type { LoaderFunction } from "remix";
import { AppPaths, Session } from "~/constants";
import { getSession } from "../sessions";
import { DataCenter, RegionInfo } from "~/interfaces";

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
  return regions;
};

export default function SelectRegion() {
  const [regionInfo] = useLoaderData();
  const navigate = useNavigate();

  const { dcInfo } = regionInfo as RegionInfo;
  return (
    <div className="card shadow-lg max-w-lg mx-auto mt-20 hover:shadow-2xl">
      <div className="card-body">
        <h2 className="card-title">Select Region</h2>
        <Form
          method="post"
          onSubmit={(event: any) => {
            event.preventDefault();
            const { value } = event.target[0];
            const splitted = value?.toString().split(":");
            const label = splitted?.[0];
            const api = splitted?.[1];
            sessionStorage.setItem("region", label);
            sessionStorage.setItem("api", api);
            navigate(AppPaths.UserManagement);
          }}
        >
          {dcInfo.map((dc: DataCenter) => {
            const {
              name,
              locationInfo: { city, countrycode },
              tags: { api },
            } = dc;
            const label = `${city}, ${countrycode}`;
            return (
              <div className="form-control" key={name}>
                <label className="cursor-pointer label">
                  <span className="label-text">{label}</span>
                  <input
                    type="radio"
                    name="region"
                    className="radio"
                    required
                    value={`${label}:${api}`}
                  />
                </label>
              </div>
            );
          })}
          <button type="submit" className="btn btn-outline btn-primary mt-6">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
