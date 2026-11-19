import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import Home from './pages/Home';
import About from './pages/About';
import Business from './pages/Business';
import NoticeList from './pages/NoticeList';
import NoticeDetail from './pages/NoticeDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './i18n/LanguageContext';
import { SiteProvider } from './features/site/SiteContext';

export default function App() {
  return (
    <LanguageProvider>
      <SiteProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="business" element={<Business />} />
              <Route path="notice" element={<NoticeList />} />
              <Route path="notice/:id" element={<NoticeDetail />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SiteProvider>
    </LanguageProvider>
  );
}
