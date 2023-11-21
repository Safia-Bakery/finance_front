import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/rootConfig.ts";
import BaseAPIClient from "./api/axiosConfig.ts";
import Loading from "./components/Loader/index.tsx";
import { Provider } from "react-redux";

//http://10.0.0.109:8000/docs

// export const baseURL = "https://6260-92-63-204-152.ngrok-free.app";
export const baseURL = "http://10.0.0.109:8000";

export default new BaseAPIClient(baseURL, store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loading />}>
      <App />
    </PersistGate>
  </Provider>
);
