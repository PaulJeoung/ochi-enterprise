import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

export default function PostCreateModal({ isOpen, onClose, onSubmit }) {
  const [newPost, setNewPost] = useState({
    title: '',
    division: 'NOTICE',
    author: '',
    content: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content || !newPost.author) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    onSubmit(newPost);
    setNewPost({ title: '', division: 'NOTICE', author: '', content: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900">공지 및 게시글 작성 (관리자/문의)</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">게시 분류</label>
            <select
              value={newPost.division}
              onChange={(e) => setNewPost({ ...newPost, division: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-600"
            >
              <option value="NOTICE">일반 공지사항</option>
              <option value="IT_SI">IT/SI 솔루션</option>
              <option value="MATERIAL">산업소재 (자석/고무)</option>
              <option value="FNB">글로벌 F&B/베이커리</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">제목 *</label>
            <input
              type="text"
              required
              placeholder="게시글 제목을 입력하세요"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">작성자(부서/성함) *</label>
            <input
              type="text"
              required
              placeholder="예: IT사업팀 홍길동"
              value={newPost.author}
              onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">내용 *</label>
            <textarea
              rows={5}
              required
              placeholder="상세 내용을 입력하세요..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-800 text-xs focus:outline-none focus:border-blue-600 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> 등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}