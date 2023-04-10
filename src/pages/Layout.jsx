import React from 'react'
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import css from './layout.module.css';
function Layout() {
    return (
        <div className={css.layout}>
            <Header  className="header"/>
            <Main className="main"/>
            <Footer className="footer"/>
        </div> 
    )
  }
  
  export default Layout;