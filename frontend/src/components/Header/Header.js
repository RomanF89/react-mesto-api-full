import logo from '../../images/header-logo.svg';
import React from 'react';
import { Link} from 'react-router-dom';

function Header({ headerCaptionLink, headerCaptionText, handleSignOut, userData }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className='header__navigation'>
        <div className='header__profile-email'>{userData}</div>
        <Link to={headerCaptionLink || ''} onClick={handleSignOut || null} className='header__caption'>
          {headerCaptionText || ''}</Link>
      </div>
    </header>
  )
}
export default Header;
