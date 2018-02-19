import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="_logo">
      <h1 className="_text">Slacker News</h1>
    </div>
    <div className="_menu">
      <Link className="_route" to="/jobs">Jobs</Link>
    </div>
  </header>
);

export default Header;
