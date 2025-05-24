import React, { useState, useRef, useEffect } from 'react';
import './PureGold.css';

function PureGold({ onClose }) {
  const [form, setForm] = useState({
    netWeight: '',
    ratePerGram: '',
    labourCharge: '',
    oldNetWeight: '',
    oldRate: ''
  });

  const [includeGST, setIncludeGST] = useState(false);
  const [bill, setBill] = useState(null);
  const resultRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setIncludeGST(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const A = parseFloat(form.netWeight) || 0;
    const B = parseFloat(form.ratePerGram) || 0;
    const C = parseFloat(form.labourCharge) || 0;
    const D = parseFloat(form.oldNetWeight) || 0;
    const E = parseFloat(form.oldRate) || 0;

    const F = A / 100 * 15;
    const G = A + F;
    const H = G * B;
    const I = H + C;
    const J = D / 100 * 10;
    const K = D - J;
    const L = K * E;

    const gstAmount = includeGST ? (0.03 * I) : 0;
    const M = I + gstAmount - L;

    if (M < 0) {
      alert(`We will give this amount: ₹${Math.abs(M).toFixed(2)}`);
    }

    const generatedBill = {
      netWeight: A.toFixed(3),
      wastage: F.toFixed(3),
      ratePerGram: B.toFixed(2),
      labourCharge: C.toFixed(2),
      jewelRate: I.toFixed(2),
      oldNetWeight: D.toFixed(3),
      oldFinalRate: L.toFixed(2),
      gst: includeGST ? gstAmount.toFixed(2) : null,
      total: M.toFixed(2)
    };

    setBill(generatedBill);
    window.__latestBillData = generatedBill;
  };

  useEffect(() => {
    if (bill && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [bill]);

  const handlePrint = () => {
    if (!bill) {
      alert('No bill data available to print.');
      return;
    }

    window.__latestBillData = bill;

    if (typeof window.PrintChannel?.postMessage === 'function') {
      const message = JSON.stringify({
        type: 'print',
        data: bill
      });
      window.PrintChannel.postMessage(message);
    } else {
      alert('Print is not supported in this environment.');
    }
  };

  const handleReset = () => {
    setForm({
      netWeight: '',
      ratePerGram: '',
      labourCharge: '',
      oldNetWeight: '',
      oldRate: ''
    });
    setIncludeGST(false);
    setBill(null);
  };

  return (
    <div>
      <form className='form' onSubmit={handleSubmit} style={formStyle}>
        <button className='closebut' type="button" onClick={onClose} style={closeBtnStyle}>✕</button>
        <center>
          <h2 style={{ color: 'tan', fontFamily: 'Arial Black' }}>GOLD BILL 916</h2>
          <table>
            <tbody>
              <tr><td><label>Net Weight:</label></td><td><input type="number" name="netWeight" step="0.01" value={form.netWeight} onChange={handleChange} /></td></tr>
              <tr><td><label>Rate Per Gram:</label></td><td><input type="number" name="ratePerGram" value={form.ratePerGram} onChange={handleChange} /></td></tr>
              <tr><td><label>Labour Charge:</label></td><td><input type="number" name="labourCharge" value={form.labourCharge} onChange={handleChange} /></td></tr>
              <tr><td><label>Old Net Weight:</label></td><td><input type="number" name="oldNetWeight" value={form.oldNetWeight} onChange={handleChange} /></td></tr>
              <tr><td><label>Old Rate:</label></td><td><input type="number" name="oldRate" value={form.oldRate} onChange={handleChange} /></td></tr>
              <tr><td><label>Include GST (3%):</label></td><td><input type="checkbox" checked={includeGST} onChange={handleCheckboxChange} /></td></tr>
            </tbody>
          </table>
          <input id="Submit" type="submit" value="Submit" style={submitStyle} />
        </center>
      </form>

      {bill && (
        <div ref={resultRef} id="my-section" style={resultStyle}>
          <table className='billtable'>
            <tbody>
              <tr><td>Net Weight:</td><td>{bill.netWeight} g</td></tr>
              <tr><td>Wastage:</td><td>{bill.wastage} g</td></tr>
              <tr><td>Rate Per Gram:</td><td>₹{bill.ratePerGram}</td></tr>
              <tr><td>Labour Charge:</td><td>₹{bill.labourCharge}</td></tr>
              <tr><td>Jewel Rate:</td><td>₹{bill.jewelRate}</td></tr>
              {bill.gst && <tr><td>GST (3%):</td><td>₹{bill.gst}</td></tr>}
              <tr><td>Old Net Weight:</td><td>{bill.oldNetWeight} g</td></tr>
              <tr><td>Old Final Rate:</td><td>₹{bill.oldFinalRate}</td></tr>
              <tr><td><hr />Total:</td><td><hr />₹{bill.total}</td></tr>
            </tbody>
          </table>
          <center className="no-print">
            <button onClick={handlePrint} style={buttonStyle}>Print</button>
            <button onClick={handleReset} style={buttonStyle}>Reset</button>
          </center>
        </div>
      )}
    </div>
  );
}

// Inline styles
const formStyle = {
  position: 'relative',
  borderRadius: '30px',
  backgroundColor: 'white',
  color: 'black',
  padding: '20px',
  width: '330px',
  margin: 'auto',
  marginTop: '105px'
};

const closeBtnStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'transparent',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#333'
};

const resultStyle = {
  marginTop: '20px',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '20px',
  width: '330px',
  margin: 'auto'
};

const submitStyle = {
  width: '50%',
  marginTop: '30px',
  padding: '10px',
  fontSize: '16px',
  fontWeight: 'bold'
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '20px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default PureGold;
