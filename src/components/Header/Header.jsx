import "./Header.css";

const Header = ({ onMenuClick }) => (
  <header className="admin-header">
    {/* Mobile menu button */}
    <button className="menu-btn" onClick={onMenuClick}>
      ☰
    </button>

    <h3>Admin Panel</h3>

    <div className="header-right">
      <span className="admin-name">Super Admin</span>
      <button className="logout-btn">Logout</button>
    </div>
  </header>
);

export default Header;
