/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import App from './App';
// import "uno.css"
// import "virtual:uno.css"
import { Router, hashIntegration } from '@solidjs/router';
// import { Router, hashIntegration } from 'solid-app-router';
// import 'unocss';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() =>
  <Router source={hashIntegration()}>
  <App />
   </Router> 
   , root!);

   
