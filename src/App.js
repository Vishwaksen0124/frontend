import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/readings");
      const json = await res.json();
      console.log("Fetched data:", json); // Log fetched data for debugging
      setData((prev) => [...prev.slice(-9), ...json]); // keep last 10 entries
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // fetch every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Saline and Room Monitoring Dashboard</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(t) => new Date(t).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
          <Line type="monotone" dataKey="level" stroke="#ff7300" name="Level (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
