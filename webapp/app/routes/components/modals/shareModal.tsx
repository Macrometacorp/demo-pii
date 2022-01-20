import { AppPaths, ModalPaths } from "~/constants";
import { getModalId } from "~/utilities/utils";

export default () => (
  <div id={getModalId(ModalPaths.ShareModal)} className="modal">
    <div className="modal-box">
      <p>
        Share \n Enim dolorem dolorum omnis atque necessitatibus. Consequatur
        aut adipisci qui iusto illo eaque. Consequatur repudiandae et. Nulla ea
        quasi eligendi. Saepe velit autem minima.
      </p>
      <div className="modal-action">
        <a href="/components/modal#" className="btn btn-primary">
          Accept
        </a>
        <a href={AppPaths.UserManagement} className="btn">
          Close
        </a>
      </div>
    </div>
  </div>
);
