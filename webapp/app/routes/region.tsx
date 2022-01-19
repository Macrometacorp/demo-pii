import { useLoaderData, Form } from "remix";
import { useNavigate } from "react-router-dom";
import type { LoaderFunction } from "remix";
import { AppPaths, Session } from "~/constants";
import { getAuthTokens } from "../sessions";
import { DataCenter, RegionInfo } from "~/interfaces";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  const { [Session.Jwt]: token, [Session.Tenant]: tenant } =
    await getAuthTokens(request);

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
  const [region, setRegion] = useState("");

  const { dcInfo } = regionInfo as RegionInfo;
  return (
    <div className="card shadow-lg max-w-lg mx-auto mt-20 hover:shadow-2xl">
      <div className="card-body">
        <h2 className="card-title">Select Region</h2>
        <Form
          method="post"
          onSubmit={(event: any) => {
            event.preventDefault();
            sessionStorage.setItem("region", region);
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
                    value={label}
                    onChange={(event) => {
                      setRegion(event.target.value);
                    }}
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
