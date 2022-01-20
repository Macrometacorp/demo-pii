import { AppPaths, ModalPaths } from "~/constants";
import { Form } from "remix";
import { getModalId } from "~/utilities/utils";


const SHARE_FORM_ID = "share_form";
export default () =>  {
  
  const message= `curl -X 'GET' \
'https://api-smoke4.eng.macrometa.io/_api/key' \
-H 'accept: application/json' \
-H 'Authorization:'`
return (
  <div id={getModalId(ModalPaths.ShareModal)} className="modal">
    <div className="modal-box">
      <p>
      {message}
      </p>
      <div className="modal-action">
      <Form
            action={AppPaths.Share}
            method="post"
            id={SHARE_FORM_ID}
          ></Form>
        <a    onClick={() => {
                (
                  document.getElementById(SHARE_FORM_ID) as HTMLFormElement
                ).submit();
              }} className="btn btn-primary">
          Send
        </a>
        <a href={AppPaths.UserManagement} className="btn">
          Close
        </a>
      </div>
    </div>
  </div>
)};
