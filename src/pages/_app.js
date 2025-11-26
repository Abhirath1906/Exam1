import "antd/dist/reset.css";
import "../pages/styles/global.css"
import { AppProvider } from "../pages/context/AppContext"

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
