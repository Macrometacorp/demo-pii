import { useLoaderData, Form } from "remix";
import { useNavigate } from "react-router-dom";
import type { LoaderFunction } from "remix";
import { AppPaths, SessionStorage } from "~/constants";
import { DataCenter, RegionInfo } from "~/interfaces";
import { useState } from "react";
import { getRegionLabel, isEu } from "~/utilities/utils";
import { getDatacenters } from "~/utilities/REST/mm";

export const loader: LoaderFunction = async ({ request }) => {
  const response = await getDatacenters(request);
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
            const dc =
              dcInfo.find((info) => info.name === region) ?? ({} as DataCenter);
            const label = getRegionLabel(dc);
            sessionStorage.setItem(SessionStorage.Region, label);
            sessionStorage.setItem(
              SessionStorage.IsPrivateRegion,
              isEu(region) === true ? "true" : "false"
            );
            navigate(AppPaths.UserManagement);
          }}
        >
          {dcInfo.map((dc: DataCenter) => {
            const { name } = dc;
            const label = getRegionLabel(dc);
            return (
              <div className="form-control" key={name}>
                <label className="cursor-pointer label">
                  <span className="label-text">{label}</span>
                  <input
                    type="radio"
                    name="region"
                    className="radio"
                    required
                    value={name}
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
