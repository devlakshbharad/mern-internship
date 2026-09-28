import type { Middleware } from "@reduxjs/toolkit";

export const loggerMiddleware: Middleware =
  store => next => action => {
    console.log("Action:", action);

    const result = next(action);

    console.log(
      "New cart state:",
      store.getState().cart
    );

    return result;
  };

  