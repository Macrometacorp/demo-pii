import { MM_TOKEN_PREFIX, ModalPaths, SessionStorage } from "~/constants";
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
  let showClass =
    "flex-1 btn-sm btn-ghost text-center leading-7 text-neutral cursor-pointer";
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
        <a
          href={ModalPaths.EditModal}
          className="flex-1 btn-sm btn-ghost text-center leading-7 text-blue-600"
        >
          Edit
        </a>
        <a
          href={ModalPaths.RemoveModal}
          className="flex-1 btn-sm btn-ghost text-center leading-7 text-red-600"
        >
          Remove
        </a>
        <a
          href={ModalPaths.ShareModal}
          className="flex-1 btn-sm btn-ghost text-center leading-7 text-green-600"
        >
          Share
        </a>
        <a
          onClick={() => {
            onShowDecryptDetailsClicked(data);
          }}
          className={showClass}
        >
          Show
        </a>
      </td>
    </tr>
  );
};
