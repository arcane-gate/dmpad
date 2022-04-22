import type { AppProps } from "next/app";
import { Layout, DiceRoller } from "../components";
import RootCSS from "../styles/tokens";
import "../styles/app.scss";

const Sidebar = () => {
  return (
    <ul>
      <li>Dashboard</li>
      <li>Characters</li>
    </ul>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RootCSS />
      <Layout sidebar={<Sidebar />}>
        <Component {...pageProps} />
        <DiceRoller />
      </Layout>
    </>
  );
}

export default MyApp;
