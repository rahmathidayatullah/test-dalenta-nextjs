import "tailwindcss/tailwind.css";
import "../styles/global.css";
import Layout from "../components/Layout";
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <div>
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
