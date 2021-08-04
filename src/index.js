import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { App } from "components/App/App";
import { store } from "store";

import "react-toastify/dist/ReactToastify.css";

render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
  document.getElementById("root")
);
