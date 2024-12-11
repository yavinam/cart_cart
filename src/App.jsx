import React from "react";
import Router from "./routes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router />;
      <ToastContainer />
    </>
  );
};

export default App;
