import { useEffect, useState } from "react";
import "./Sales.css";

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [openStatusId, setOpenStatusId] = useState(null);

  // Dummy orders (backend se replace hoga)
  useEffect(() => {
    setOrders([
      {
        id: 1,
        product: "MacBook Pro 13”",
        variants: "2 Variants",
        category: "Laptop",
        price: 2399,
        status: "delivered",
        image: "https://via.placeholder.com/48",
      },
      {
        id: 2,
        product: "Apple Watch Ultra",
        variants: "1 Variant",
        category: "Watch",
        price: 879,
        status: "pending",
        image: "https://via.placeholder.com/48",
      },
      {
        id: 3,
        product: "iPhone 15 Pro Max",
        variants: "2 Variants",
        category: "Smartphone",
        price: 1869,
        status: "cancelled",
        image: "https://via.placeholder.com/48",
      },
    ]);
  }, []);

  // 🔄 Status change (REAL logic)
  const changeStatus = (id, newStatus) => {
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o
      )
    );
    setOpenStatusId(null);

    // 🔥 Backend ke liye (future)
    // api.updateOrderStatus(id, newStatus)
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="sales-page">
      {/* HEADER */}
      <div className="sales-header">
        <h2>Recent Orders</h2>

        <div className="sales-actions">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button className="outline-btn">See all</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="sales-card">
        <table>
          <thead>
            <tr>
              <th>Products</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="product-cell">
                  <img src={order.image} alt="" />
                  <div>
                    <strong>{order.product}</strong>
                    <span>{order.variants}</span>
                  </div>
                </td>

                <td>{order.category}</td>
                <td>${order.price}</td>

                {/* STATUS WITH DROPDOWN */}
                <td className="status-cell">
                  <span
                    className={`status ${order.status}`}
                    onClick={() =>
                      setOpenStatusId(
                        openStatusId === order.id ? null : order.id
                      )
                    }
                  >
                    {order.status}
                  </span>

                  {openStatusId === order.id && (
                    <div className="status-menu">
                      <button onClick={() => changeStatus(order.id, "pending")}>
                        Pending
                      </button>
                      <button onClick={() => changeStatus(order.id, "delivered")}>
                        Delivered
                      </button>
                      <button onClick={() => changeStatus(order.id, "cancelled")}>
                        Cancelled
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="4" className="empty-row">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
