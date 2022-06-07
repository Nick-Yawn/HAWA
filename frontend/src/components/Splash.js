import { Link, useHistory } from 'react-router-dom';

import './Splash.css';

export default function Splash() {
  const history = useHistory();

  return (
    <div className="splash-container">
      <div className="splash-content">
        <span className="welcome-to splash-text">Welcome to</span>
        <span className="splash-title splash-text">HAWA</span>
        <span className="splash-text splash-copy">HAWA writes your wiki docs for you. Create Projects, then add:</span>
        <span className="splash-text splash-copy">Features</span>
        <span className="splash-text splash-copy">Routes</span>
        <span className="splash-text splash-copy">User Stories</span>
        <span className="splash-text splash-copy">with painless conversion to pre-formatted wiki docs.</span>
        <span className="splash-text splash-copy coming-soon">Acceptance Criteria coming soon!</span>

        <a href="https://youtu.be/wvvC7FZ3_gU" id="tips-and-tricks-link">Tips and Tricks Video
          <i class="fa-light fa-arrow-up-right-from-square"></i>
        </a>

        <button onClick={()=>history.push('/sign-up')} className="get-started-button">
         Get Started
        </button>
        <div className="splash-footer-container">
          <div className="splash-text splash-credits">
            <span className="splash-credit-text">An original work by Nick Yuan</span>
            <a href="https://github.com/Nick-Yawn" target="_blank" rel="noreferrer" className="splash-link" >
              <i className="fa-brands fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/nick-yawn/" target="_blank" rel="noreferrer" className="splash-link" >
              <i className="fa-brands fa-linkedin" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
