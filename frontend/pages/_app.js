import { SessionProvider } from "next-auth/react";
import "../styles/global.css";
import '../styles/navbar.css'
import store from "../public/app/store";
import { Provider } from "react-redux";
import Layout from '../public/app/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
