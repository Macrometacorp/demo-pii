import { useSubmit } from "remix";
import { AppPaths, HttpMethods, ModalPaths } from "~/constants";
import { ModalProps } from "~/interfaces";
import { getModalId } from "~/utilities/utils";

export default ({ modalUserDetails, onModalClose }: ModalProps) => {
  const submit = useSubmit();
  return (
    <div id={getModalId(ModalPaths.RemoveModal)} className="modal modal-open">
      <div className="modal-box">
        <p>Are you sure you want to delete? This operation is irreversible!</p>
        <div className="modal-action">
          <button
            className="btn btn-warning"
            onClick={() => {
              submit(
                { token: modalUserDetails.token },
                {
                  method: HttpMethods.Delete,
                  action: AppPaths.UserManagement,
                }
              );
            }}
          >
            Yes, I understand.
          </button>
          <button
            className="btn btn-neutral"
            onClick={() => {
              onModalClose();
            }}
          >
            No, please take me back!
          </button>
        </div>
      </div>
    </div>
  );
};
