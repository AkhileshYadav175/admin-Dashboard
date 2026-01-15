import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // General
    siteName: "My Admin Panel",
    currency: "INR",
    timezone: "Asia/Kolkata",
    maintenanceMode: false,
    // Profile
    adminName: "Super Admin",
    adminEmail: "admin@example.com",
    // Security
    password: "",
    confirmPassword: "",
    // Product & Orders
    defaultStockStatus: "In Stock",
    allowReviews: true,
    orderPrefix: "ORD",
    // New: Notifications
    emailNotifications: true,
    lowStockAlert: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (section) => {
    // Yahan API call aa sakti hai
    alert(`${section} settings updated successfully!`);
    console.log("Saving data:", settings);
  };

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h2>System Settings</h2>
        <p>Manage your website configuration and preferences</p>
      </header>

      <div className="settings-layout">
        {/* Sidebar Tabs */}
        <aside className="settings-tabs">
          <button className={activeTab === "general" ? "active" : ""} onClick={() => setActiveTab("general")}>General</button>
          <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Admin Profile</button>
          <button className={activeTab === "security" ? "active" : ""} onClick={() => setActiveTab("security")}>Security</button>
          <button className={activeTab === "store" ? "active" : ""} onClick={() => setActiveTab("store")}>Store & Orders</button>
          <button className={activeTab === "advanced" ? "active" : ""} onClick={() => setActiveTab("advanced")}>Advanced</button>
        </aside>

        {/* Content Area */}
        <main className="settings-content">
          {activeTab === "general" && (
            <div className="settings-card">
              <h3>General Configuration</h3>
              <div className="form-group">
                <label>Site Name</label>
                <input name="siteName" value={settings.siteName} onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Currency</label>
                  <select name="currency" value={settings.currency} onChange={handleChange}>
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Timezone</label>
                  <select name="timezone" value={settings.timezone} onChange={handleChange}>
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>
              </div>
              <label className="checkbox-label">
                <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} />
                Enable Maintenance Mode
              </label>
              <button className="btn-save" onClick={() => handleSave("General")}>Save Changes</button>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="settings-card">
              <h3>Admin Profile</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input name="adminName" value={settings.adminName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="adminEmail" value={settings.adminEmail} onChange={handleChange} />
              </div>
              <button className="btn-save" onClick={() => handleSave("Profile")}>Update Profile</button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-card">
              <h3>Security Settings</h3>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" name="password" placeholder="••••••••" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="••••••••" onChange={handleChange} />
              </div>
              <button className="btn-save" onClick={() => handleSave("Security")}>Change Password</button>
            </div>
          )}

          {activeTab === "store" && (
            <div className="settings-card">
              <h3>Store Settings</h3>
              <div className="form-group">
                <label>Order Prefix</label>
                <input name="orderPrefix" value={settings.orderPrefix} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Default Stock Status</label>
                <select name="defaultStockStatus" value={settings.defaultStockStatus} onChange={handleChange}>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <label className="checkbox-label">
                <input type="checkbox" name="allowReviews" checked={settings.allowReviews} onChange={handleChange} />
                Allow Product Reviews
              </label>
              <button className="btn-save" onClick={() => handleSave("Store")}>Save Store Settings</button>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="settings-card danger-zone">
              <h3>Danger Zone</h3>
              <p>Deleting or resetting data is permanent. Please be careful.</p>
              <button className="btn-danger" onClick={() => alert("System reset initiated...")}>Reset All Data</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;