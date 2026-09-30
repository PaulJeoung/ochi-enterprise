import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import HeroSection from './components/sections/HeroSection';
import BusinessSection from './components/sections/BusinessSection';
import ContactSection from './components/sections/ContactSection';
import BoardSection from './components/board/BoardSection';
import { INITIAL_POSTS } from './data/initialPosts';

export default function App() {
  const [selectedDivision, setSelectedDivision] = useState('IT_SI');
  const [toastMessage, setToastMessage] = useState('');
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // 알림 토스트 핸들러
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // 특정 사업부 탭 선택 시 견적 폼으로 부드럽게 스크롤
  const handleSelectDivision = (divKey) => {
    setSelectedDivision(divKey);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 신규 게시글 추가 핸들러 (향후 DB API 호출 지점)
  const handleAddPost = (newPostData) => {
    const postObj = {
      ...newPostData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      views: 1
    };
    // 상태 업데이트 (실제 DB 연동 시 이 자리에 axios/fetch or supabase/firebase insert)
    setPosts([postObj, ...posts]);
    showToast('새 공지/게시글이 성공적으로 등록되었습니다.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar onSelectDivision={handleSelectDivision} />
      
      <main className="flex-1">
        <HeroSection onSelectDivision={handleSelectDivision} />
        <BusinessSection onSelectDivision={handleSelectDivision} />
        <ContactSection
          selectedDivision={selectedDivision}
          onSelectDivision={setSelectedDivision}
          onToast={showToast}
        />
        <BoardSection posts={posts} onAddPost={handleAddPost} />
      </main>

      <Footer />
      <Toast message={toastMessage} />
    </div>
  );
}