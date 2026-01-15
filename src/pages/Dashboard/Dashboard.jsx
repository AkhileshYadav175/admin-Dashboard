import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import "./Dashboard.css";

/* ---------------- MOCK API ---------------- */
const fetchDashboardData = async ({ fromDate, toDate, range }) => {
  await new Promise(res => setTimeout(res, 500));

  const baseData = {
    totalSales: 16252,
    orders: 1248,
    users: 860,
    refunds: 321,
    growth: {
      sales: 12.5,
      orders: 8.1,
      users: 4.6,
      refunds: -2.1
    }
  };

  const chartsMap = {
    "7D": [
      { label: "Mon", sales: 2200, refunds: 120 },
      { label: "Tue", sales: 2800, refunds: 180 },
      { label: "Wed", sales: 3200, refunds: 140 },
      { label: "Thu", sales: 2600, refunds: 90 },
      { label: "Fri", sales: 3900, refunds: 210 },
      { label: "Sat", sales: 2100, refunds: 80 },
      { label: "Sun", sales: 1450, refunds: 60 }
    ],
    "30D": Array.from({ length: 30 }, (_, i) => ({
      label: `Day ${i + 1}`,
      sales: Math.floor(Math.random() * 3000) + 1000,
      refunds: Math.floor(Math.random() * 200)
    })),
    MONTH: Array.from({ length: 28 }, (_, i) => ({
      label: `D${i + 1}`,
      sales: Math.floor(Math.random() * 2800) + 1200,
      refunds: Math.floor(Math.random() * 150)
    }))
  };

  return {
    ...baseData,
    charts: chartsMap[range]
  };
};


const Dashboard = () => {
  const today = new Date().toISOString().split("T")[0];

  
  const [darkMode, setDarkMode] = useState(false);

  
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  
  const [appliedDates, setAppliedDates] = useState({
    from: today,
    to: today
  });

  
  const [salesTarget, setSalesTarget] = useState(25000);
  const [editTarget, setEditTarget] = useState(false);
  const [tempTarget, setTempTarget] = useState(25000);

  
  const [range, setRange] = useState("7D");
  const [metric, setMetric] = useState("sales");

  
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleApplyDate = () => {
    if (new Date(fromDate) > new Date(toDate)) {
      alert("From date cannot be greater than To date");
      return;
    }
    setAppliedDates({ from: fromDate, to: toDate });
  };

  
  useEffect(() => {
    setLoading(true);
    fetchDashboardData({
      fromDate: appliedDates.from,
      toDate: appliedDates.to,
      range
    }).then(data => {
      setStats(data);
      setChartData(data.charts);
      setLoading(false);
    });
  }, [appliedDates, range]);

  
  const achievedPercent = useMemo(() => {
    if (!stats) return 0;
    return Math.min(Math.round((stats.totalSales / salesTarget) * 100), 100);
  }, [stats, salesTarget]);

  const trendPercent = useMemo(() => {
    if (!chartData.length) return 0;
    const first = chartData[0][metric];
    const last = chartData[chartData.length - 1][metric];
    return first ? Math.round(((last - first) / first) * 100) : 0;
  }, [chartData, metric]);

  if (loading) return <div className="dashboard">Loading...</div>;

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      {/* HEADER */}
      <div className="dashboard-top">
        <div>
          <h1>Dashboard</h1>
          <p>Production-ready business analytics</p>
        </div>

        <div className="top-actions">
          <div className="date-filter">
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
            <span>to</span>
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
            <button className="apply-btn" onClick={handleApplyDate}>Apply</button>
          </div>

          <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="dashboard-cards">
        <Stat title="Total Sales" value={`₹${stats.totalSales}`} percent={stats.growth.sales} />
        <Stat title="Orders" value={stats.orders} percent={stats.growth.orders} />
        <Stat title="Users" value={stats.users} percent={stats.growth.users} />
        <Stat title="Refunds" value={stats.refunds} percent={stats.growth.refunds} />
      </div>

      {/* CHART */}
      <motion.div className="chart-box">
        <div className="chart-header">
          <h3>Trend</h3>
          <div className="chart-actions">
            {["7D", "30D", "MONTH"].map(r => (
              <button key={r} className={range === r ? "active" : ""} onClick={() => setRange(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="metric-toggle">
          {["sales", "refunds"].map(m => (
            <button key={m} className={metric === m ? "active" : ""} onClick={() => setMetric(m)}>
              {m}
            </button>
          ))}
        </div>

        <p className={trendPercent >= 0 ? "up" : "down"}>
          {trendPercent >= 0 ? "▲" : "▼"} {Math.abs(trendPercent)}%
        </p>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip content={<CustomTooltip metric={metric} />} />
            <Line dataKey={metric} stroke="#4f46e5" strokeWidth={3} dot={false} />
            {metric === "sales" && (
              <ReferenceLine
                y={salesTarget / chartData.length}
                stroke="#f59e0b"
                strokeDasharray="5 5"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* SALES TARGET */}
      <div className="dashboard-box">
        <div className="box-header">
          <h3>Sales Target</h3>
          {!editTarget && <span onClick={() => { setTempTarget(salesTarget); setEditTarget(true); }}>Edit</span>}
        </div>

        {!editTarget ? (
          <>
            <h2>₹{salesTarget}</h2>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${achievedPercent}%` }} />
            </div>
            <p>{achievedPercent}% achieved</p>
          </>
        ) : (
          <>
            <input type="number" value={tempTarget} onChange={e => setTempTarget(e.target.value)} />
            <button onClick={() => { setSalesTarget(tempTarget); setEditTarget(false); }}>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

/* KPI CARD */
const Stat = ({ title, value, percent }) => (
  <div className="stat-card">
    <span>{title}</span>
    <h2>{value}</h2>
    <small className={percent >= 0 ? "up" : "down"}>
      {percent >= 0 ? "▲" : "▼"} {Math.abs(percent)}%
    </small>
  </div>
);

/* TOOLTIP */
const CustomTooltip = ({ active, payload, label, metric }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="tooltip">
      <strong>{label}</strong>
      <p>{metric === "sales" ? `Sales: ₹${d.sales}` : `Refunds: ₹${d.refunds}`}</p>
    </div>
  );
};

export default Dashboard;
