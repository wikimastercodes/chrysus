import React, { useState, useRef } from 'react';
import { FaInstagram, FaXTwitter, FaBriefcase } from 'react-icons/fa6';
import PureGold from './PureGolds';
import AlloyGold from './AlloyGolds';
import Silver from './PureSilvers';
import Pawn from './Pawns';
import CustomGold from './CustomGolds'; // <-- Added this import
import './App.css';

function App() {
  const [showPureGold, setShowPureGold] = useState(false);
  const [showAlloyGold, setShowAlloyGold] = useState(false);
  const [showSilver, setShowSilver] = useState(false);
  const [showPawn, setShowPawn] = useState(false);
  const [showCustomGold, setShowCustomGold] = useState(false); // <-- Added this state
  const [searchTerm, setSearchTerm] = useState('');

  const goldRef = useRef(null);
  const silverRef = useRef(null);
  const pawnRef = useRef(null);
  const gold916Ref = useRef(null);
  const gold22kRef = useRef(null);

  const handleSearch = () => {
    const query = searchTerm.toLowerCase().trim();

    if (query.includes('916')) {
      gold916Ref.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (query.includes('22k')) {
      gold22kRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (query.includes('gold')) {
      goldRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (query.includes('silver')) {
      silverRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (query.includes('pawn')) {
      pawnRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <div className="logo-icon" />
          <h2>CHRYSUS</h2>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="social-icons">
          <a href="https://wikimastercodes.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
            <FaBriefcase />
          </a>
          <a href="https://instagram.com/vignesh_gkt?igsh=d243c29seHJsM2Jo" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://x.com/VickyRcva?t=44mZ7UxtTwZup0TiHoZzMw&s=08" target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="card">
          <div className="hero-section">
            <div className="hero-text">
              <h1>Welcome</h1>
              <h1>to</h1>
              <h1>CHRYSUS</h1>
            </div>
          </div>
        </div>

        <div className="heading">
          <h1>Make Your Own Bills:</h1>
        </div>

        {/* Gold Section */}
        <div className="gold-section" ref={goldRef}>
          <h2>Gold Bill</h2>
          <p>In "916", the default wastage is 15% and the old jewel wastage is 10%. In "22K", the default wastage is 10% and the old jewel wastage is also 10%. If you want to specify custom wastages, please use "Custom Gold"</p>
          <div className="gold-cards">
            <div className="gold-card gold-card-916" ref={gold916Ref} onClick={() => setShowPureGold(true)}>
              <span className="card-text">916</span>
            </div>
            <div className="gold-card gold-card-22k" ref={gold22kRef} onClick={() => setShowAlloyGold(true)}>
              <span className="card-text">22K</span>
            </div>
            <div className="gold-card gold-card-custom" onClick={() => setShowCustomGold(true)}>
              <span className="card-text">Custom Gold</span>
            </div>
          </div>
        </div>

        {/* Silver Section */}
        <div className="silver-section" ref={silverRef}>
          <h2>Silver Bill</h2>
          <p>In "Silver", the default wastage is 10%, and the old silver wastage is also 10%. If the old silver net weight is greater than the actual net weight, the excess weight is calculated at half of the actual rate. </p>
          <div className="silver-cards">
            <div className="silver-card" onClick={() => setShowSilver(true)}>
              <span className="card-text">Silver</span>
            </div>
          </div>
        </div>

        {/* Pawn Section */}
        <div className="pawn-section" ref={pawnRef}>
          <h2>Pawn Calculator</h2>
          <p>This is the calculator for calculate the Interest</p>
          <div className="pawn-cards">
            <div className="pawn-card" onClick={() => setShowPawn(true)}>
              <span className="card-text">Pawn</span>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showPureGold && (
          <div className="modal-overlay">
            <PureGold onClose={() => setShowPureGold(false)} />
          </div>
        )}
        {showAlloyGold && (
          <div className="modal-overlay">
            <AlloyGold onClose={() => setShowAlloyGold(false)} />
          </div>
        )}
        {showSilver && (
          <div className="modal-overlays">
            <Silver onClose={() => setShowSilver(false)} />
          </div>
        )}
        {showPawn && (
          <div className="modal-overlays">
            <Pawn onClose={() => setShowPawn(false)} />
          </div>
        )}
        {showCustomGold && (
          <div className="modal-overlay">
            <CustomGold onClose={() => setShowCustomGold(false)} />
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} CHRYSUS. All rights reserved.</p>
            <div className="footer-icons">
              <a href="https://wikimastercodes.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
                <FaBriefcase />
              </a>
              <a href="https://instagram.com/vignesh_gkt?igsh=d243c29seHJsM2Jo" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://x.com/VickyRcva?t=44mZ7UxtTwZup0TiHoZzMw&s=08" target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
