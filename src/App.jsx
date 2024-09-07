import React, { useState } from 'react';
import ChartComponent from './pages/ChartComponent';
import ModalComponent from './pages/ModalComponent';
import ProfitLossBox from './pages/ProfitLossBox';
import './App.css';

export default function App() {
  const [chartData, setChartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [newPrice, setNewPrice] = useState('');

  const handleAddData = () => {
    const newData = {
      price: parseFloat(newPrice),
      time: new Date().toISOString(),
    };
    setChartData([...chartData, newData]);
    setShowModal(false);
  };

  const totalEntries = chartData.length;

  const getPriceDifference = () => {
    if (chartData.length < 2) return { profit: 0, loss: 0 };
    const firstPrice = chartData[0].price;
    const lastPrice = chartData[chartData.length - 1].price;
    const difference = lastPrice - firstPrice;
    const percentage = ((difference / firstPrice) * 100).toFixed(2);
    return difference >= 0
      ? { profit: difference, loss: 0, percentage: `+${percentage}%` }
      : { profit: 0, loss: Math.abs(difference), percentage: `${percentage}%` };
  };

  const priceDifference = getPriceDifference();

  return (
    <div className="app-container">
      <h2>Commodity Price Chart</h2>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="currency-selector"
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
      </select>

      <div className="top-info">
        <div>Total Entries: {totalEntries} <span className="live">● Live</span></div>
      </div>

      <ProfitLossBox priceDifference={priceDifference} currency={currency} />

      <ChartComponent chartData={chartData} currency={currency} />

      <button className="add-price-button" onClick={() => setShowModal(true)}>
        Add New Price
      </button>

      <ModalComponent
        showModal={showModal}
        setShowModal={setShowModal}
        newPrice={newPrice}
        setNewPrice={setNewPrice}
        handleAddData={handleAddData}
        currency={currency}
      />
    </div>
  );
}
