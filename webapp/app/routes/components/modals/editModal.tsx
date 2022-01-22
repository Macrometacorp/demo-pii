import { useEffect, useState } from "react";
import { Form } from "remix";
import { AppPaths, ModalPaths } from "~/constants";
import { ModalProps, UserData } from "~/interfaces";
import { getModalId, isMMToken } from "~/utilities/utils";

export default ({ modalUserDetails, onModalClose }: ModalProps) => {
  const [decryptData, setDecryptData] = useState({});

  useEffect(() => {
    const { token } = modalUserDetails;
    const isPrivateRecord = !isMMToken(token);

    if (isPrivateRecord) {
      fetch(`/decrypt?token=${token}`)
        .then((response) => {
          return response.text();
        })
        .then((response) => {
          const parsed = JSON.parse(response);
          const { state, country, zipcode, job_title, token } =
            modalUserDetails;
          const { login, email, phone } = parsed?.data;

          const decryptedData: UserData = {
            token,
            name: login,
            email,
            phone,
            state,
            country,
            zipcode,
            job_title,
          };

          setDecryptData(decryptedData);
        })
        .catch((error) => {
          alert("failed op");
          console.error(error);
        });
    } else {
      setDecryptData(modalUserDetails);
    }
  }, []);

  let content = <div>Getting decrypted data...</div>;
  if (Object.keys(decryptData).length) {
    const { name, email, phone, state, country, zipcode, job_title } =
      decryptData as UserData;
    content = (
      <Form action={AppPaths.UserManagement} method="put">
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
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
            value={job_title}
            className="input input-primary input-bordered"
          />
        </div>
      </Form>
    );
  }

  return (
    <div id={getModalId(ModalPaths.EditModal)} className="modal modal-open">
      <div className="modal-box">
        {content}
        <div className="modal-action">
          <button className="btn btn-primary" type="submit">
            Accept
          </button>
          <a onClick={onModalClose} className="btn">
            Close
          </a>
        </div>
      </div>
    </div>
  );
};
