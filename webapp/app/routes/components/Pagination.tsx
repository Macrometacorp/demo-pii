export const Pagination = ({
  contactsPerPage,
  totalContacts,
  paginate,
  currentPage,
}: {
  contactsPerPage: number;
  totalContacts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-row-reverse py-2">
      <div className="flex flex-col">
        <div className="p-2">
          <p className="text-sm text-gray-700">
            Showing
            {" "}
            <span className="font-medium">
              {currentPage * contactsPerPage - contactsPerPage + 1}{" "}
            </span>
            to
            <span className="font-medium">
              {" "}
              {totalContacts < currentPage * contactsPerPage
                ? totalContacts
                : currentPage * contactsPerPage}{" "}
            </span>
            of
            <span className="font-medium"> {totalContacts} </span>
          </p>
        </div>
        <nav className="block">
          <ul className="flex p-2 rounded list-none flex-wrap">
            <li>
              {pageNumbers.map((number) => (
                <a
                  onClick={() => {
                    paginate(number);
                  }}
                  href="#"
                  className={
                    currentPage === number
                      ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  }
                >
                  {number}
                </a>
              ))}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
