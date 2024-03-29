import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import global_pt from "../translations/pt-br/global.json";
import global_en from "../translations/en-us/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "pt-br",
  resources: {
    en: {
      global: global_en,
    },
    pt: {
      global: global_pt,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <I18nextProvider i18n={i18next}>
    <App />,
  </I18nextProvider>
);
