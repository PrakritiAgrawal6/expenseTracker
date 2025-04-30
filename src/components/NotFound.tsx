import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginTop: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25,
        fontWeight: 700,
      }}
    >
      <p>Page not found</p>
      <button
        data-testid="return"
        onClick={() => navigate("/")}
        className="border !border-1 border-black px-4 rounded-lg"
      >
        go home
      </button>
    </div>
  );
};

export default NotFound;
