import { useEffect, useState } from "react";
import { AppPaths, ModalPaths, SessionStorage } from "~/constants";
import { LocationData } from "~/interfaces";
import { getModalId } from "~/utilities/utils";

export default () => {
  const [decryptData, setDecryptData] = useState(null);
  const [rowData, setRowData] = useState(null);
  useEffect(() => {
    const rowData = sessionStorage.getItem(SessionStorage.RowData);

    if (rowData) {
      const parsedRowData = JSON.parse(rowData);
      fetch(`/decrypt?token=${parsedRowData.token}`)
        .then((response) => {
          return response.text();
        })
        .then((response) => {
          const parsed = JSON.parse(response);
          console.log(parsed);
          setDecryptData(parsed.data);
          setRowData(parsedRowData);
        })
        .catch((error) => {
          alert("failed op");
          console.error(error);
        });
    }
  }, []);

  let content = <div>Loading...</div>;
  if (decryptData) {
    const { login, email, phone } = decryptData;
    const { state, country, zipcode, job_title } = (rowData ||
      {}) as LocationData;
    content = (
      <>
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            disabled
            value={login}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            disabled
            value={email}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="tel"
            name="phone"
            disabled
            value={phone}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">State</span>
          </label>
          <input
            type="text"
            name="state"
            disabled
            value={state}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Country</span>
          </label>
          <input
            type="text"
            name="country"
            disabled
            value={country}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Zipcode</span>
          </label>
          <input
            type="text"
            name="zipcode"
            disabled
            value={zipcode}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Job Title</span>
          </label>
          <input
            type="text"
            name="job_title"
            disabled
            value={job_title}
            className="input input-primary input-bordered"
          />
        </div>
      </>
    );
  }

  return (
    <div id={getModalId(ModalPaths.ShowDecryptedModal)} className="modal">
      <div className="modal-box">
        {content}
        <div className="modal-action">
          <a href={AppPaths.UserManagement} className="btn">
            Close
          </a>
        </div>
      </div>
    </div>
  );
};
