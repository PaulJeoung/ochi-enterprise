import React from 'react';
import { X, Calendar, User, Eye, Tag } from 'lucide-react';

export default function PostDetailModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {post.division}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <h3 className="text-xl font-bold text-slate-900 leading-snug">{post.title}</h3>
          <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-4">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> 조회수 {post.views}</span>
          </div>
          <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line py-2">
            {post.content}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}