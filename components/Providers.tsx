"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'



interface Props {
  children: React.ReactNode;
}
const Providers = (props: Props) => {
    let persistor = persistStore(store)

  return (
    <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>

        {props.children}
        </PersistGate>
    </Provider>
  );
};

export default Providers;