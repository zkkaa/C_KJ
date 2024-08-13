import React, { useState } from 'react';
import "../../CSS/Pages_transaksi/Transaksi_pengeluaran.css";

function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div>
      <button className="kurangpengeluaran" onClick={handleDecrement}>-</button>
      <span>{quantity}</span>
      <button className="tambahpengeluaran" onClick={handleIncrement}>+</button>
    </div>
  );
}

export default QuantitySelector;
