// components/Layout.js

import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      {/* You can also add a footer or other layout elements here */}
    </div>
  );
};

export default Layout;
