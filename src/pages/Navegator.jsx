import React from 'react';
import logo from '../assets/images/meLogo.png';
import { NavLink } from 'react-router-dom';
import css from './navBar.module.css';
import Insta from '../assets/images/insta-white-border.png';
import { isMobile } from 'react-device-detect';

function Navegator() {

  return (
    <div className={css.navContainer}>

      <div className={css.logo}>
        <NavLink to='/'><img src={logo} alt="logo"/></NavLink> 
      </div>

      <div className={css.navLinkContainer}>
        {
          !isMobile ? 
          <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="browse">Browse</NavLink>
              <NavLink to='/about'> About </NavLink>
              {/* TODO: if logged show "ADD" tab */}
              <NavLink to="/add"> +Recipe</NavLink>
              <a href="https://en.bc.fi/qualifications/full-stack-web-developer-program/" target="blank">HBC</a>
          </> :
          <>
          <div></div>
          {/* TODO: Make a hamburger menu */}
          <NavLink to="/">Menu</NavLink>
          </>
        }
        <a href="https://instagram.com/feelit_cookit?igshid=YmMyMTA2M2Y=" target="blank">
            <img src={Insta} className={css.some} alt="insta"/>
        </a>
      </div> 
    </div>
  )
}

export default Navegator;