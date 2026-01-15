import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="layout-main">
        <Header />
        <div className="layout-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
