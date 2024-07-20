import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Dashboard() {
  const { user, logout } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <h2>Hi {user.name}!</h2>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
