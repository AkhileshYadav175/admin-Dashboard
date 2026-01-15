import React from "react";
import "./Reports.css";

const Reports = () => {
  // Dummy Users Report
  const usersReport = [
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", joined: "2025-12-10" },
    { id: 2, name: "Amit Kumar", email: "amit@gmail.com", joined: "2025-12-15" },
  ];

  // Dummy Sales Report
  const salesReport = [
    { id: 1, customer: "Rahul Sharma", amount: 1200, date: "2026-01-02" },
    { id: 2, customer: "Neha Singh", amount: 2300, date: "2026-01-04" },
  ];

  return (
    <div>
      <h1 className="page-title">Reports</h1>

      {/* Users Report */}
      <div className="card report-section">
        <h3>Users Report</h3>

        <table className="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {usersReport.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales Report */}
      <div className="card report-section">
        <h3>Sales Report</h3>

        <table className="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {salesReport.map((sale, index) => (
              <tr key={sale.id}>
                <td>{index + 1}</td>
                <td>{sale.customer}</td>
                <td>₹ {sale.amount}</td>
                <td>{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
