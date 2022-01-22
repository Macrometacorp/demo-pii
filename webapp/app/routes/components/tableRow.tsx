import { MM_TOKEN_PREFIX } from "~/constants";
import { RowProps } from "~/interfaces";
import { truncate } from "~/utilities/utils";

export default ({
  activeRow,
  data,
  setActiveRow,
  isPrivateRegion,
  onShowDecryptDetailsClicked,
}: RowProps) => {
  const { token, name, email, phone, state, country, zipcode, job_title } =
    data;
  const isPrivate = isPrivateRegion === "true";
  const isMMToken =
    token.substring(0, MM_TOKEN_PREFIX.length) === MM_TOKEN_PREFIX;

  const isButtonDisabled = !isPrivate && !isMMToken;

  let showClass = "flex-1 btn-sm btn-ghost text-center leading-7 text-neutral";
  if (isPrivate) {
    showClass += isMMToken ? " invisible" : "";
  } else {
    showClass += " hidden";
  }
  return (
    <tr
      className={activeRow === token ? "active" : ""}
      onMouseEnter={() => {
        setActiveRow(token);
      }}
      onMouseLeave={() => {
        setActiveRow("");
      }}
    >
      <td>{truncate(name)}</td>
      <td>{truncate(email)}</td>
      <td>{truncate(phone)}</td>
      <td>{truncate(state)}</td>
      <td>{truncate(country)}</td>
      <td>{truncate(zipcode)}</td>
      <td>{truncate(job_title)}</td>
      <td className="flex">
        <button
          className={`flex-1 btn btn-ghost btn-sm text-center leading-7 text-blue-600 mr-2 ${
            isButtonDisabled ? "btn-disabled" : ""
          }`}
          disabled={isButtonDisabled}
        >
          Edit
        </button>
        <button
          className={`flex-1 btn btn-ghost btn-sm text-center leading-7 text-error mr-2 ${
            isButtonDisabled ? "btn-disabled" : ""
          }`}
          disabled={isButtonDisabled}
        >
          Remove
        </button>
        <button
          className={`flex-1 btn btn-ghost btn-sm text-center leading-7 text-green-600 mr-2 ${
            isButtonDisabled ? "btn-disabled" : ""
          }`}
          disabled={isButtonDisabled}
        >
          Share
        </button>
        <button
          className={showClass}
          disabled={isButtonDisabled}
          onClick={() => {
            onShowDecryptDetailsClicked(data);
          }}
        >
          Show
        </button>
      </td>
    </tr>
  );
};
