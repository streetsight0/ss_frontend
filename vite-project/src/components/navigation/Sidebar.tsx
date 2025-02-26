import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
        <div>
            <h2>Sidebar</h2>
            <ul>
                <li>
                    <Link to="/home">Dashboard</Link>
                </li>
            </ul>
        </div>
        <Outlet />
    </div>
  );
};

export default Sidebar;
