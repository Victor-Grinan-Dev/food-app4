import React from 'react';
import logo from '../assets/images/meLogo.png';
import { NavLink } from 'react-router-dom';
import css from './navBar.module.css';
import Insta from '../assets/images/insta-white-border.png';

function Navegator() {

  return (
    <div className={css.navContainer}>

      <div className={css.logo}>
        <NavLink to='/'><img src={logo} alt="logo"/></NavLink> 
      </div>

      <div className={css.navLinkContainer}>

              <NavLink to="/"><span className="material-symbols-outlined">
                home
              </span></NavLink>
              <NavLink to="browse"><span className="material-symbols-outlined">
              restaurant
                </span></NavLink>
              <NavLink to='/about'> <span className="material-symbols-outlined">
                info
                </span> </NavLink>
              {/* TODO: if logged show "ADD" tab */}
              <NavLink to="/add"> <span className="material-symbols-outlined">
                  add
                  </span><span className="material-symbols-outlined">
                  restaurant
                </span></NavLink>
              <a href="https://en.bc.fi/qualifications/full-stack-web-developer-program/" target="blank"><span className="material-symbols-outlined">
school
</span></a>
        
        
      </div> 
      <a href="https://instagram.com/feelit_cookit?igshid=YmMyMTA2M2Y=" target="blank">
            <img src={Insta} className={css.some} alt="insta"/>
        </a>
    </div>
  )
}

export default Navegator;