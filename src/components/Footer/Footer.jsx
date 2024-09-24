import React from 'react';
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-left">
          <h3>RetroPhil Platform</h3>
          <p>largest Philatelic market for stamp collectors</p>
          <ul className="social-icons">
            <li>
              <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-center">
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-right">
          <p>&copy; {new Date().getFullYear()} RetroPhil Platform. All rights reserved.</p>
        </div>
      </div>
      <div className="team-section">
        <h3>Our Team</h3>
        <div className="team-members">
          <div className="team-member">
            <ul className="social-icons">
              <li>
                <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
            <h4>Aditya Sahu</h4>
            <p>Backend Developer</p>
          </div>

          <div className="team-member">
            <ul className="social-icons">
              <li>
                <a href="https://github.com/bluebell2505" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://x.com/Bluebell2505" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/vasundhara-dixit/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
            <h4>Raj Barshikar</h4>
            <p>Backend Developer</p>
          </div>

          <div className="team-member">
            <ul className="social-icons">
              <li>
                <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
            <h4>Vasundhara Dixit</h4>
            <p>Frontend Developer</p>
          </div>

          {/* Additional team members */}
          <div className="team-member">
            <ul className="social-icons">
              <li>
                <a href="https://github.com/member-4" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/member-4" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/member-4" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
            <h4>Dhananjay Chitale</h4>
            <p>Role</p>
          </div>

          <div className="team-member">
            <ul className="social-icons">
              <li>
                <a href="https://github.com/member-5" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/member-5" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/member-5" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
            <h4>Chandan Bhirud</h4>
            <p>Role</p>
          </div>

          <div className="team-member">
            <ul className="social-icons">
              <li>
                <a href="https://github.com/member-6" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/member-6" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/member-6" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
            <h4>Suraj Gunjal</h4>
            <p>Role</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
