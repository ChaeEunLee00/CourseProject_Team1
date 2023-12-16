// 애플리케이션을 렌더링하는 역할을 한다. 주로 ReactDOM.render 함수를 사용하여 App 컴포넌트를 루트 엘리먼트에 렌더링한다.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
