import { Form } from "remix";
import { AppPaths, ModalPaths, SessionStorage } from "~/constants";
import { AddContactModalProps } from "~/interfaces";
import { getModalId } from "~/utilities/utils";

export default ({ isPrivateRegion }: AddContactModalProps) => (
  <div id={getModalId(ModalPaths.AddContactModal)} className="modal">
    <div className="modal-box">
      <Form action={AppPaths.AddContact} method="post" reloadDocument>
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Bruce Wayne"
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
            required
            placeholder="bruce@wayneindustries.com"
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
            required
            placeholder="272984356"
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
            required
            placeholder="New Jersey"
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
            required
            placeholder="USA"
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
            required
            placeholder="53540"
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
            required
            placeholder="CEO"
            className="input input-primary input-bordered"
          />
        </div>

        <input
          type="hidden"
          name={SessionStorage.IsPrivateRegion}
          value={isPrivateRegion}
        />

        <div className="modal-action">
          <button className="btn btn-primary" type="submit">
            Accept
          </button>
          <a href={AppPaths.UserManagement} className="btn">
            Close
          </a>
        </div>
      </Form>
    </div>
  </div>
);
