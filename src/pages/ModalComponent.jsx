import React, { useState } from 'react';
import Modal from 'react-modal';

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    minHeight: '150px',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

export default function ModalComponent({ showModal, setShowModal, newPrice, setNewPrice, handleAddData, currency }) {
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!newPrice) {
      setError('Please add some value');
    } else {
      setError('');
      handleAddData();
    }
  };

  return (
    <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} style={customModalStyles}>
      <h3>Add New Price</h3>
      {error && <p style={{ color: 'red', marginTop: '1px' }}>{error}</p>}
      <input
        type="number"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
        placeholder={`Enter Price in ${currency}`}
        className="price-input"
        style={error ? { border: '1px solid red' } : {}}
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </Modal>
  );
}
