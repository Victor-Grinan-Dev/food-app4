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
        <NavLink to="/">Home</NavLink>
        <NavLink to="browse">Browse</NavLink>
        <NavLink to='/about'> About </NavLink>
        <NavLink to="/add">Add new recipe</NavLink>
        <a href="https://en.bc.fi/qualifications/full-stack-web-developer-program/" target="blank">HBC</a>
        <a href="https://instagram.com/feelit_cookit?igshid=YmMyMTA2M2Y=" target="blank">
            <img src={Insta} className={css.some} alt="insta"/>
        </a>
      </div> 
    </div>
  )
}

export default Navegator;