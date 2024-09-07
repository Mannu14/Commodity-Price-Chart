import React from 'react';
import './style/ProfitLossBox.css';

export default function ProfitLossBox({ priceDifference, currency }) {
  return (
    <div className="profit-loss-container">
      <div className="loss-box">
        Loss: {priceDifference.loss} {currency} ({priceDifference.percentage})
      </div>
      <div className="profit-box">
        Profit: {priceDifference.profit} {currency} ({priceDifference.percentage})
      </div>
    </div>
  );
}
