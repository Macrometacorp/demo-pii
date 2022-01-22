import { useEffect, useState } from "react";
import { Form } from "remix";
import { AppPaths, HttpMethods, ModalPaths } from "~/constants";
import { ModalProps, UserData } from "~/interfaces";
import { getModalId, isMMToken } from "~/utilities/utils";

export default ({ modalUserDetails, onModalClose }: ModalProps) => {
  const [decryptData, setDecryptData] = useState({} as UserData);

  const handleInput = (inputType: string) => {
    return (event: any) => {
      const { value } = event.target;
      setDecryptData({
        ...decryptData,
        [inputType]: value,
      });
    };
  };

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
    const { country, token } = decryptData as UserData;
    content = (
      <Form
        action={AppPaths.UserManagement}
        method={HttpMethods.Put}
        // with "reloadDocument" always "post" request is being sent
        // hence use "token" to distinguish between create/update
        reloadDocument
      >
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={decryptData?.name}
            onChange={handleInput("name")}
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
            value={decryptData?.email}
            onChange={handleInput("email")}
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
            value={decryptData?.phone}
            onChange={handleInput("phone")}
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
            value={decryptData?.state}
            onChange={handleInput("state")}
            className="input input-primary input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Country</span>
          </label>
          <input
            type="text"
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
            value={decryptData?.zipcode}
            onChange={handleInput("zipcode")}
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
            value={decryptData?.job_title}
            onChange={handleInput("job_title")}
            className="input input-primary input-bordered"
          />
        </div>

        <input type="text" name="token" value={token} className="hidden" />
        <input type="text" name="country" value={country} className="hidden" />

        <div className="modal-action">
          <button className="btn btn-primary" type="submit">
            Update
          </button>
          <a onClick={onModalClose} className="btn">
            Close
          </a>
        </div>
      </Form>
    );
  }

  return (
    <div id={getModalId(ModalPaths.EditModal)} className="modal modal-open">
      <div className="modal-box">
        {content}
        {/* use <Form> button instead when data is there */}
        {!Object.keys(decryptData).length && (
          <div className="modal-action">
            <a onClick={onModalClose} className="btn">
              Close
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
