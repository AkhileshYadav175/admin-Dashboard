import "./Header.css";

const Header = () => (
  <header className="admin-header">
    <h3>Admin Panel</h3>

    <div className="header-right">
      <span className="admin-name">Super Admin</span>
      <button className="logout-btn">Logout</button>
    </div>
  </header>
);

export default Header;
