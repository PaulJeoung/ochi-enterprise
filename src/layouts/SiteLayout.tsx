import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileQuickBar from './MobileQuickBar';
import ScrollManager from './ScrollManager';
import NoticePopup from '../features/notice/NoticePopup';

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col pb-14 lg:pb-0">
      <ScrollManager />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileQuickBar />
      <NoticePopup />
    </div>
  );
}
