import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Main from './containers/Main/Main';
import Drawer from './containers/Drawer/Drawer';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import { AuthProviderWrapper } from './config/authProvider';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <BrowserRouter>
      <AuthProviderWrapper>
        <div className={'App'}>
          <div id={'page-container'}>
            <div className={'row'}>
              <Auth/>
              <Main/>
              <Drawer/>
            </div>
          </div>
        </div>
      </AuthProviderWrapper>
    </BrowserRouter>
  );
};

// class App extends Component {
//   componentDidMount() {
//     M.AutoInit();
//   }
//   render() {
//     return (
//       <BrowserRouter>
//         <div className="App">
//           <div id="page-container">
//             <div className="row">
//               <Auth/>
//               <Main/>
//               <Drawer/>
//             </div>
//           </div>
//         </div>
//       </BrowserRouter>
//     );
//   }
// }

export default App;
