import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/rootConfig.ts";
import BaseAPIClient from "./api/axiosConfig.ts";
import Loading from "./components/Loader/index.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/helpers.ts";
import { ToastContainer } from "react-toastify";

//https://api.finance.safiabakery.uz/docs

export const baseURL = "https://api.finance.safiabakery.uz";

export default new BaseAPIClient(baseURL, store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ToastContainer autoClose={1000} />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
