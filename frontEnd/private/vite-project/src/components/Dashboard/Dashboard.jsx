import React from 'react';
import './Dashboard.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Dashboard = () => {
  // Sample data for the cards and graph
  const data = [
    {
      month: 'Jan',
      consultations: 10,
      diseases: 5,
      payments: 20,
      vaccinations: 15,
    },
    {
      month: 'Feb',
      consultations: 15,
      diseases: 7,
      payments: 25,
      vaccinations: 10,
    },
    {
      month: 'Mar',
      consultations: 20,
      diseases: 10,
      payments: 30,
      vaccinations: 12,
    },
    // Add more data points for each month
  ];

  return (
    <div className="dashboard-container">
      <div className="cards-container">
        <div className="card">
          <h3>Consultations</h3>
          <p>{data[0].consultations}</p>
        </div>
        <div className="card">
          <h3>Diseases</h3>
          <p>{data[0].diseases}</p>
        </div>
        <div className="card">
          <h3>Payments</h3>
          <p>{data[0].payments}</p>
        </div>
        <div className="card">
          <h3>Vaccinations Taken</h3>
          <p>{data[0].vaccinations}</p>
        </div>
      </div>
      <div className="chart-container">
        <h2>Monthly Data</h2>
        <LineChart width={700} height={450} data={data} className="neon-graph">
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="consultations" stroke="#8884d8" />
          <Line type="monotone" dataKey="diseases" stroke="#82ca9d" />
          <Line type="monotone" dataKey="payments" stroke="#ffc658" />
          <Line type="monotone" dataKey="vaccinations" stroke="#ff5722" />
        </LineChart>
      </div>
      <div className="history-container">
        <h2 style={{ fontSize: '3rem' }}>Previous History</h2>
        <div className="history-item">
          <p>Vaccinations Taken</p>
          <p>May 15, 2023</p>
        </div>
        <div className="history-item">
          <p>Disease Name</p>
          <p>May 14, 2023</p>
        </div>
        <div className="history-item">
          <p>Vaccinations Taken</p>
          <p>May 13, 2023</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
