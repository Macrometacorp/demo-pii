import { parse as parseCSV } from "papaparse";

const FILE_SELECTOR_ID = "file-selector";

export default () => (
  <div className="-mb-14 flex flex-row">
    <div className="flex-1 lg:flex-none">
      <div className="form-control">
        <input type="text" placeholder="Search" className="input input-ghost" />
      </div>
    </div>
    <div className="flex-none">
      <button className="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-6 h-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
    <div className="flex-none">
      <input
        className="hidden"
        type="file"
        id={FILE_SELECTOR_ID}
        onChange={(event) => {
          const file = event.target.files?.[0] || "";
          parseCSV(file, {
            complete: (results) => {
              console.log(results);
            },
          });
        }}
      />
      <button
        className="btn btn-square btn-ghost"
        onClick={() => {
          document.getElementById(FILE_SELECTOR_ID)?.click();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0"
          y="0"
          viewBox="0 0 24 24"
          className="inline-block w-6 h-6 stroke-current opacity-95"
        >
          <g>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M18.4,7.379a1.128,1.128,0,0,1-.769-.754h0a8,8,0,1,0-15.1,5.237A1.046,1.046,0,0,1,2.223,13.1,5.5,5.5,0,0,0,.057,18.3,5.622,5.622,0,0,0,5.683,23H11a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H5.683a3.614,3.614,0,0,1-3.646-2.981,3.456,3.456,0,0,1,1.376-3.313A3.021,3.021,0,0,0,4.4,11.141a6.113,6.113,0,0,1-.073-4.126A5.956,5.956,0,0,1,9.215,3.05,6.109,6.109,0,0,1,9.987,3a5.984,5.984,0,0,1,5.756,4.28,2.977,2.977,0,0,0,2.01,1.99,5.934,5.934,0,0,1,.778,11.09.976.976,0,0,0-.531.888h0a.988.988,0,0,0,1.388.915c4.134-1.987,6.38-7.214,2.88-12.264A6.935,6.935,0,0,0,18.4,7.379Z"
              fill="#ffffff"
              data-original="#000000"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M18.707,16.707a1,1,0,0,0,0-1.414l-1.586-1.586a3,3,0,0,0-4.242,0l-1.586,1.586a1,1,0,0,0,1.414,1.414L14,15.414V23a1,1,0,0,0,2,0V15.414l1.293,1.293a1,1,0,0,0,1.414,0Z"
              fill="#ffffff"
              data-original="#000000"
            />
          </g>
        </svg>
      </button>
    </div>
    <div className="flex-none dropdown dropdown-end">
      <button className="btn btn-square btn-ghost">
        <img src="macrometa-icon.png" className="w-6 h-6 m-1" />
      </button>
      <ul
        tabIndex={0}
        className="p-2 shadow menu dropdown-content bg-primary rounded-box w-52"
      >
        <li
          onClick={() => {
            alert("change region");
          }}
        >
          <a>Change Region</a>
        </li>
        <li
          onClick={() => {
            alert("change region");
          }}
        >
          <a>Logout</a>
        </li>
      </ul>
    </div>
  </div>
);
