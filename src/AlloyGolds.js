import React, { useState, useRef, useEffect } from 'react';
import './AlloyGold.css';

function AlloyGold({ onClose }) {
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

    const F = A / 100 * 10;
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

    setBill({
      netWeight: A,
      wastage: F,
      ratePerGram: B,
      labourCharge: C,
      jewelRate: I,
      oldNetWeight: D,
      oldFinalRate: L,
      gst: includeGST ? gstAmount : null,
      total: M
    });
  };

  useEffect(() => {
    if (bill && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [bill]);

  const handlePrint = () => {
  if (window.PrintChannel && bill) {
    const billContent = `
GOLD BILL 

Net Weight: ${bill.netWeight.toFixed(3)} g
Wastage: ${bill.wastage.toFixed(3)} g
Rate Per Gram: ₹${bill.ratePerGram.toFixed(2)}
Labour Charge: ₹${bill.labourCharge.toFixed(2)}
Jewel Rate: ₹${bill.jewelRate.toFixed(2)}
${bill.gst !== null ? `GST (3%): ₹${bill.gst.toFixed(2)}\n` : ''}
Old Net Weight: ${bill.oldNetWeight.toFixed(3)} g
Old Final Rate: ₹${bill.oldFinalRate.toFixed(2)}

-------------------------------
Total: ₹${bill.total.toFixed(2)}
    `.trim();

    window.PrintChannel.postMessage(billContent);
  } else {
    window.print();
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
        <button type="button" onClick={onClose} style={closeBtnStyle}>✕</button>
        <center>
          <h2 style={{ color: 'tan', fontFamily: 'Arial Black' }}>
            GOLD BILL 22k<br />
          </h2>
          <table>
            <tbody>
              <tr><td><label>Net Weight:</label></td>
                <td><input type="number" name="netWeight" step="0.01" value={form.netWeight} onChange={handleChange} /></td></tr>
              <tr><td><label>Rate Per Gram:</label></td>
                <td><input type="number" name="ratePerGram" value={form.ratePerGram} onChange={handleChange} /></td></tr>
              <tr><td><label>Labour Charge:</label></td>
                <td><input type="number" name="labourCharge" value={form.labourCharge} onChange={handleChange} /></td></tr>
              <tr><td><label>Old Jewel Net Weight:</label></td>
                <td><input type="number" name="oldNetWeight" value={form.oldNetWeight} onChange={handleChange} /></td></tr>
              <tr><td><label>Old Jewel Rate:</label></td>
                <td><input type="number" name="oldRate" value={form.oldRate} onChange={handleChange} /></td></tr>
              <tr>
                <td><label>Include GST (3%)</label></td>
                <td><input type="checkbox" checked={includeGST} onChange={handleCheckboxChange} /></td>
              </tr>
            </tbody>
          </table>
          <input id="Submit" type="submit" value="Submit" style={submitStyle} />
        </center>
      </form>

      {bill && (
        <div ref={resultRef} id="my-section" style={resultStyle}>
          <table className='billtable'>
            <tbody>
              <tr><td>Net Weight:</td><td>{bill.netWeight.toFixed(3)} gram</td></tr>
              <tr><td>Wastage:</td><td>{bill.wastage.toFixed(3)} gram</td></tr>
              <tr><td>Rate Per Gram:</td><td>{bill.ratePerGram.toFixed(3)} Rs</td></tr>
              <tr><td>Labour Charge:</td><td>{bill.labourCharge.toFixed(3)} Rs</td></tr>
              <tr><td>Jewel Rate:</td><td>{bill.jewelRate.toFixed(3)} Rs</td></tr>
              {bill.gst !== null && <tr><td>GST (3%):</td><td>{bill.gst.toFixed(3)} Rs</td></tr>}
              <tr><td>Old Jewel Net Weight:</td><td>{bill.oldNetWeight.toFixed(3)} gram</td></tr>
              <tr><td>Old Jewel Final Rate:</td><td>{bill.oldFinalRate.toFixed(3)} Rs</td></tr>
              <tr><td><hr />Total:</td><td><hr />{bill.total.toFixed(3)} Rs</td></tr>
            </tbody>
          </table>
          <center style={{ marginTop: '20px' }} className="no-print">
            <button onClick={handlePrint} style={buttonStyle}>Print</button>
            <button onClick={handleReset} style={buttonStyle}>Reset</button>
          </center>
        </div>
      )}
    </div>
  );
}

// Inline Styles
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

export default AlloyGold;
