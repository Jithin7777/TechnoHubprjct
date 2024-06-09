import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { UserProvider } from './Components/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<GoogleOAuthProvider  clientId="623961390683-k9kuqtn784mlh961h4l914be83g95hoi.apps.googleusercontent.com">
{/* <UserProvider> */}
    <BrowserRouter>
          <App />
    </BrowserRouter> 
  
{/* </UserProvider> */}
</GoogleOAuthProvider> 
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
