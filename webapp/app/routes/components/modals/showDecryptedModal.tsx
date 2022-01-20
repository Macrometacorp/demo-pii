import { AppPaths, ModalPaths } from "~/constants";
import { getModalId } from "~/utilities/utils";

export default () => (
  <div id={getModalId(ModalPaths.ShowDecryptedModal)} className="modal">
    <div className="modal-box">
      <div className="form-control">
        <label className="label font-semibold">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          disabled
          value="Bruce Wayne"
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
          value="bruce@wayneindustries.com"
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
          value="272984356"
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
          value="New Jersey"
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
          value="USA"
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
          value="53540"
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
          value="CEO"
          className="input input-primary input-bordered"
        />
      </div>

      <div className="modal-action">
        <a href={AppPaths.UserManagement} className="btn">
          Close
        </a>
      </div>
    </div>
  </div>
);
