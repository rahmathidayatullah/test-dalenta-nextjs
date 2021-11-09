import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Layout from "../components/Layout";
import { wrapper } from "../redux/store";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Test Dalenta</title>
        <meta name="viewport" content="initial-scale=1.0, width=1250px" />
      </Head>
      {!pageProps.data ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}

export default wrapper.withRedux(MyApp);
