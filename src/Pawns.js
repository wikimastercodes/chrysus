import React, { useState, useRef, useEffect } from 'react';

function Pawn({ onClose }) {
  const [form, setForm] = useState({
    rateOfInterest: '',
    principal: '',
    months: ''
  });

  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const A = parseFloat(form.rateOfInterest) || 0;
    const B = parseFloat(form.principal) || 0;
    const C = parseFloat(form.months) || 0;

    const interest = ((A * 10) * (B / 1000) * C);
    setResult(interest);
  };

  const handleReset = () => {
    setForm({ rateOfInterest: '', principal: '', months: '' });
    setResult(null);
  };

  useEffect(() => {
    if (result !== null && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  const principal = parseFloat(form.principal) || 0;
  const totalAmount = result !== null ? result + principal : null;

  return (
    <div>
      <form className='form' onSubmit={handleSubmit} style={formStyle}>
        <button type="button" onClick={onClose} style={closeBtnStyle}>✕</button>
        <center>
          <h2 style={{ color: 'tan', fontFamily: 'Arial Black' }}>PAWN CALCULATOR</h2>
          <table>
            <tbody>
              <tr>
                <td><label>Rate of Interest:</label></td>
                <td>
                  <input
                    type="number"
                    name="rateOfInterest"
                    step="0.5"
                    value={form.rateOfInterest}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td><label>Amount:</label></td>
                <td>
                  <input
                    type="number"
                    name="principal"
                    value={form.principal}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td><label>Months:</label></td>
                <td>
                  <input
                    type="number"
                    name="months"
                    step="0.5"
                    value={form.months}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input id="Submit" type="submit" value="Submit" style={submitStyle} />
        </center>
      </form>

      {result !== null && (
        <div ref={resultRef} style={resultStyle}>
          <center>
            <h3>Interest Amount = {result.toFixed(2)} Rs</h3>
            <h3>Total Amount = {(totalAmount).toFixed(2)} Rs</h3>
            <button onClick={handleReset} style={buttonStyle} className="no-print">Reset</button>
          </center>
        </div>
      )}
    </div>
  );
}

// Styles
const formStyle = {
  position: 'relative',
  borderRadius: '10px',
  backgroundColor: 'black',
  color: 'white',
  padding: '20px',
  width: '330px',
  margin: 'auto',
  marginTop: '10px'
};

const closeBtnStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'transparent',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#fff'
};

const submitStyle = {
  width: '100%',
  marginTop: '30px',
  marginBottom: '30px',
  padding: '10px',
  fontSize: '16px',
  fontWeight: 'bold'
};

const resultStyle = {
  marginTop: '20px',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  width: '330px',
  margin: 'auto'
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Pawn;
