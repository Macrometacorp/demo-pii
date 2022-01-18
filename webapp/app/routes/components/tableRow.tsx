import { RowProps } from "~/interfaces";

export default ({ activeRow, data, setActiveRow }: RowProps) => (
  <tr
    className={activeRow === data.user_token ? "active" : ""}
    onMouseEnter={() => {
      setActiveRow(data.user_token);
    }}
    onMouseLeave={() => {
      setActiveRow("");
    }}
  >
    <th>{data.user_token}</th>
    <td>{data.name}</td>
    <td>{data.phone}</td>
    <td>{data.email}</td>
    <td>{data.city}</td>
    <td>{data.zipcode}</td>
    <td className="flex">
      <a
        href="#edit-modal"
        className="flex-1 btn-sm btn-ghost text-center leading-7 text-blue-600"
      >
        Edit
      </a>
      <a
        href="#remove-modal"
        className="flex-1 btn-sm btn-ghost text-center leading-7 text-red-600"
      >
        Remove
      </a>
      <a
        href="#share-modal"
        className="flex-1 btn-sm btn-ghost text-center leading-7 text-green-600"
      >
        Share
      </a>
    </td>
  </tr>
);
