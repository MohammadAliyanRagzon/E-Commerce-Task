"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import NavBar from "./components/navbar";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <NavBar />
      {children}
      <ToastContainer />

    </Provider>
  );
}
