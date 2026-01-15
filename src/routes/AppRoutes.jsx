import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserList from "../pages/Users/UserList";
// import AddUser from "../pages/Users/AddUser";

// import ProductList from "../pages/Products/ProductList";
import AddProduct from "../pages/Products/AddProduct";
import EditProduct from "../pages/Products/EditProduct";

import Sales from "../pages/Sales/Sales";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
    <Route path="/users" element={<MainLayout><UserList /></MainLayout>} />
    {/* <Route path="/users/add" element={<MainLayout><AddUser /></MainLayout>} /> */}

    {/* <Route path="/products" element={<MainLayout><ProductList /></MainLayout>} /> */}
    <Route path="/products/add" element={<MainLayout><AddProduct /></MainLayout>} />
    <Route
      path="/products/edit/:id"
      element={<MainLayout><EditProduct /></MainLayout>}
    />

    <Route path="/sales" element={<MainLayout><Sales /></MainLayout>} />
    <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
    <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
  </Routes>
);

export default AppRoutes;
