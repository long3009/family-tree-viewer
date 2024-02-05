import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../hooks/AuthContext";
import Routes from "./Routes";
import { CookiesProvider, useCookies } from "react-cookie";
export const App = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
};
export default App;
