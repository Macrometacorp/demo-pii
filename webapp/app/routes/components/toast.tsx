import { useState } from "react";
import { ToastTypes } from "~/constants";

export default ({
  toastType,
  message,
}: {
  toastType: ToastTypes;
  message: string;
}) => {
  const [show, setShow] = useState(true);

  let classes = "alert fixed bottom-10 right-10 left-10";
  switch (toastType) {
    case ToastTypes.Success:
      classes += " alert-success";
      break;
    case ToastTypes.Error:
      classes += " alert-error";
      break;
    default:
      classes += " alert-info";
  }
  return (
    <div className={`${classes} ${show ? "" : "hidden"}`}>
      <strong>{toastType}</strong> {message}
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => {
          setShow(false);
        }}
      >
        &times;
      </button>
    </div>
  );
};
