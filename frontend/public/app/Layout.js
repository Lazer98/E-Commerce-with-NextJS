// components/Layout.js

import Navbar from '../../components/Navbar';
import NavbarHorizontal from '../../components/NavbarHorizontal';
import Footer from '../../components/FooterComponent';
import NavbarPopup from '../../components/NavbarPopup';

const Layout = ({ children }) => {
  return (
    <div className="flex-col">
    <NavbarHorizontal />
    <div className="flex" >
      <Navbar isVisible={true}/>
      <main>{children}</main>
    </div>
    <Footer/>
    <NavbarPopup />
   </div>
  );
};

export default Layout;
