import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => (
  <>
    {/* Overlay (mobile) */}
    <div
      className={`sidebar-overlay ${isOpen ? "show" : ""}`}
      onClick={onClose}
    />

    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="logo">ADMIN</h2>

      <nav className="menu">
        <Link to="/" onClick={onClose}>Dashboard</Link>
        <Link to="/users" onClick={onClose}>Users</Link>
        <Link to="/products/add" onClick={onClose}>Add Product</Link>
        <Link to="/sales" onClick={onClose}>Sales</Link>
        <Link to="/reports" onClick={onClose}>Reports</Link>
        <Link to="/settings" onClick={onClose}>Settings</Link>
      </nav>
    </aside>
  </>
);

export default Sidebar;
