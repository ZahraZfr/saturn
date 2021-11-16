import config from './services/config';
import React from 'react';
import { Route, Routes } from "react-router-dom"
import AuthProvider from './components/providers/auth.provider';
import CustomRoute from "./components/auth/custom.route"


function App() {

  return (
    <AuthProvider>
      <Routes>
        {
          Object.keys(config.routes).map(routeConfig => {
            const route = config.routes[routeConfig]
            const { component: Component } = route
            // const Component = route.component

            console.log({ route })
            return <Route key={routeConfig} path={route.pathname} element={
              <CustomRoute isProtected={route.isProtected}>
                <Component  />
              </CustomRoute>
            } />
          })
        }
      </Routes>
    </AuthProvider>
  );
}

export default App;
