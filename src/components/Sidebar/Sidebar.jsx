import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => (
  <aside className="sidebar">
    <h2 className="logo">ADMIN</h2>

    <nav className="menu">
      <Link to="/">Dashboard</Link>
      <Link to="/users">Users</Link>
      {/* <Link to="/users/add">Add User</Link> */}
      <Link to="/products/add">Add Product</Link>
      <Link to="/sales">Sales</Link>
      <Link to="/reports">Reports</Link>
      <Link to="/settings">Settings</Link>
      {/* <Link to="/products">Products</Link> */}

    </nav>
  </aside>
);

export default Sidebar;
