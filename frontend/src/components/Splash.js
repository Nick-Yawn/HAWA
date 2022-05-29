import { Link, useHistory } from 'react-router-dom';

import './Splash.css';

export default function Splash() {
  const history = useHistory();

  const copyString = "HAWA makes CRUD-app planning easy. Create Projects, then add Features, User Stories, Routes, and Acceptance Criteria. Finally, export them to wiki friendly GitHub Flavored Markdown, coming soon!";

  return (
    <div className="splash-container">
      <div className="splash-content">
        <span className="welcome-to splash-text">Welcome to</span>
        <span className="splash-title splash-text">HAWA</span>
        <span className="splash-text splash-copy">HAWA makes CRUD-app planning easy. Create Projects, then add:</span>
        <span className="splash-text splash-copy">Features</span>
        <span className="splash-text splash-copy">Routes</span>
        <span className="splash-text splash-copy">User Stories*</span>
        <span className="splash-text splash-copy">Acceptance Criteria*</span>
        <span className="splash-text splash-copy">with painless conversion to pre-formatted wiki docs.</span>
        <span className="splash-text splash-copy coming-soon">*Coming soon!</span>
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
