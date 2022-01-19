import { ModalPaths } from "~/constants";
import { RowProps } from "~/interfaces";

export default ({ activeRow, data, setActiveRow }: RowProps) => (
  <tr
    className={activeRow === data.token ? "active" : ""}
    onMouseEnter={() => {
      setActiveRow(data.token);
    }}
    onMouseLeave={() => {
      setActiveRow("");
    }}
  >
    <th>{data.token}</th>
    <td>{data.name}</td>
    <td>{data.email}</td>
    <td>{data.phone}</td>
    <td>{data.state}</td>
    <td>{data.country}</td>
    <td>{data.zipcode}</td>
    <td>{data.job_title}</td>
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
    </td>
  </tr>
);
