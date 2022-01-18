import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Build with love. From Macrometa</h2>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
    </div>
  );
}
