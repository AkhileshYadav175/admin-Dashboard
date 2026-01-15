import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css";

const UsersList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);

  // 🔥 EDIT MODAL STATES
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // Dummy data
  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "Florence Shaw",
        email: "florence@untitled.com",
        status: "active",
        lastActive: "Mar 4, 2024",
        createdAt: "July 4, 2022",
      },
      {
        id: 2,
        name: "Amit Kumar",
        email: "amit@gmail.com",
        status: "blocked",
        lastActive: "Mar 2, 2024",
        createdAt: "July 4, 2022",
      },
      {
        id: 3,
        name: "Neha Singh",
        email: "neha@gmail.com",
        status: "active",
        lastActive: "Mar 6, 2024",
        createdAt: "July 4, 2022",
      },
    ]);
  }, []);

  // 🔍 Search + Filter
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Delete (dummy)
  const handleDelete = (id) => {
    if (!window.confirm("Delete this user?")) return;
    setUsers(users.filter((u) => u.id !== id));
  };

  // Block / Activate
  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "blocked" : "active" }
          : u
      )
    );
  };

  // Save edit (dummy)
  const handleEditSave = (e) => {
    e.preventDefault();

    setUsers(
      users.map((u) => (u.id === editUser.id ? editUser : u))
    );

    setIsEditOpen(false);
    setEditUser(null);
  };

  return (
    <div className="users-page">
      {/* TOP BAR */}
      <div className="users-top">
        <h2>
          All users <span>{filteredUsers.length}</span>
        </h2>

        <div className="users-actions">
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

          <button
            className="btn-primary"
            onClick={() => navigate("/users/add")}
          >
            + Add user
          </button>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="users-card">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Status</th>
              <th>Last active</th>
              <th>Date added</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td><input type="checkbox" /></td>

                  <td className="user-info">
                    <div className="avatar">{user.name.charAt(0)}</div>
                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        user.status === "active"
                          ? "badge-active"
                          : "badge-blocked"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>{user.lastActive}</td>
                  <td>{user.createdAt}</td>

                  {/* ACTION MENU */}
                  <td className="action-cell">
                    <button
                      className="dots-btn"
                      onClick={() =>
                        setOpenMenuId(openMenuId === user.id ? null : user.id)
                      }
                    >
                      ⋮
                    </button>

                    {openMenuId === user.id && (
                      <div className="action-menu">
                        <button
                          onClick={() => {
                            setEditUser(user);
                            setIsEditOpen(true);
                            setOpenMenuId(null);
                          }}
                        >
                          Edit
                        </button>

                        <button onClick={() => toggleStatus(user.id)}>
                          {user.status === "active" ? "Block" : "Activate"}
                        </button>

                        <button
                          className="danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 EDIT USER MODAL */}
      {isEditOpen && editUser && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit User</h3>

            <form onSubmit={handleEditSave}>
              <label>Name</label>
              <input
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />

              <label>Email</label>
              <input
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />

              <label>Status</label>
              <select
                value={editUser.status}
                onChange={(e) =>
                  setEditUser({ ...editUser, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
