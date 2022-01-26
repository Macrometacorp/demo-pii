import { ToastTypes } from "~/constants";

export default ({
  toastType,
  message,
  showToast,
}: {
  toastType: ToastTypes;
  message: string;
  showToast: boolean;
}) => {

  let classes = "";
  switch (toastType) {
    case ToastTypes.Success:
      classes += "bg-green-500 ";
      break;
    case ToastTypes.Error:
      classes += "bg-red-600 ";
      break;
    default:
      classes += "bg-yellow-500 ";
  }

  return (
    <>
      {showToast ? (
        <div className="flex flex-col justify-center absolute left-0 right-0 bottom-5">
          <div
            className={`${classes} shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`}
            id="static-example"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div
              className={`p-3 ${classes} rounded-b-lg break-words text-white`}
            >
              {message}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
