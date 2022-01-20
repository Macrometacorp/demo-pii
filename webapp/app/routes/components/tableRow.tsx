import { MM_TOKEN_PREFIX, ModalPaths } from "~/constants";
import { RowProps } from "~/interfaces";

export default ({
  activeRow,
  data,
  setActiveRow,
  isPrivateRegion,
}: RowProps) => {
  const { token, name, email, phone, state, country, zipcode, job_title } =
    data;
  const isPrivate = isPrivateRegion === "true";
  const isMMToken =
    token.substring(0, MM_TOKEN_PREFIX.length) === MM_TOKEN_PREFIX;
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
      <th>{token}</th>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{state}</td>
      <td>{country}</td>
      <td>{zipcode}</td>
      <td>{job_title}</td>
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
        <a href={ModalPaths.ShareModal} className={showClass}>
          Show
        </a>
      </td>
    </tr>
  );
};
