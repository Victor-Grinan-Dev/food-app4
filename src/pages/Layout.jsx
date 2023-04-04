import React from 'react'
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

function Layout() {
    return (
        <div className="layout">
            <Header  className="header"/>
            <Main className="main"/>
            <Footer className="footer"/>
        </div> 
    )
  }
  
  export default Layout;