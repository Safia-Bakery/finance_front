import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/rootConfig.ts";
import BaseAPIClient from "./api/axiosConfig.ts";
import Loading from "./components/Loader/index.tsx";
import { Provider } from "react-redux";

// export const baseURL = "https://backend.service.safiabakery.uz";
// export const baseURL = "http://10.0.0.253:8000";
export const baseURL = "http://109.94.172.130:8000";

export default new BaseAPIClient(baseURL, store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loading />}>
      <App />
    </PersistGate>
  </Provider>
);
