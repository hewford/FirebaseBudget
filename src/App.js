import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Main from './containers/Main/Main';
import Drawer from './containers/Drawer/Drawer';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import { AuthProvider } from 'utils/contexts/authProvider';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <BrowserRouter>
      <div className={'App'}>
        <div id={'page-container'}>
          <div className={'row'}>
            <AuthProvider>
              <Auth/>
              <Main/>
              <Drawer />
            </AuthProvider>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
