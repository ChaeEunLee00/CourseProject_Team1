// 애플리케이션의 진입점이 되는 파일로, 라우팅 및 전역 상태 관리를 초기화하고 주요 컴포넌트를 렌더링하는 역할을 한다.
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Main from './Pages/Main';
import Profile from './Pages/Profile';
import SearchResult  from './Pages/SearchResult';
import LikedPosts from './Pages/LikedPosts';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/profile/:keyword" element={<Profile />} />
        <Route path="/search-results/:keyword" element={<SearchResult />} />
        <Route path="/likedposts" element={<LikedPosts />} />
      </Routes>
    </Router>
  );
}

export default App
