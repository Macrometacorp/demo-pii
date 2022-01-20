import { Link } from "remix";
import { AppPaths } from "~/constants";

export default function Index() {
  return (
    <div className="hero">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <p className="mb-5 text-3xl font-bold">User Management Portal</p>
          <p className="mb-5">Built with love by Macrometa</p>
          <Link to={AppPaths.Login}>
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
