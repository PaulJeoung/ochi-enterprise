import React, { useState, useMemo } from 'react';
import { Search, Plus, Calendar, Tag, ChevronRight, MessageSquareText } from 'lucide-react';
import PostDetailModal from './PostDetailModal';
import PostCreateModal from './PostCreateModal';

export default function BoardSection({ posts, onAddPost }) {
  const [boardCategory, setBoardCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 검색 및 카테고리 필터링
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchCategory = boardCategory === 'ALL' || post.division === boardCategory;
      const matchSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [posts, boardCategory, searchTerm]);

  return (
    <section id="board" className="py-24 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 헤더 영역 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-blue-600 font-semibold text-xs tracking-wider uppercase">Notice & Board</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">고객지원 & 사업부별 공지</h2>
            <p className="text-slate-600 text-sm mt-1">
              신규 제품 규격 공지, IT 개발 및 납품 레퍼런스, 글로벌 선적 동향을 확인하세요.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold self-start md:self-auto shadow-sm"
          >
            <Plus className="w-4 h-4" />
            공지/문의 글 등록
          </button>
        </div>

        {/* 필터 및 검색 바 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { key: 'ALL', label: '전체보기' },
              { key: 'NOTICE', label: '공지사항' },
              { key: 'IT_SI', label: 'IT·SI' },
              { key: 'MATERIAL', label: '산업소재' },
              { key: 'FNB', label: '글로벌F&B' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setBoardCategory(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  boardCategory === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="제목, 내용 또는 담당자 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* 게시글 테이블 / 카드 리스트 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {filteredPosts.length === 0 ? (
            <div className="p-16 text-center text-slate-500 text-sm">
              <MessageSquareText className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              검색 조건에 일치하는 게시글이 없습니다.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="p-5 hover:bg-blue-50/50 cursor-pointer transition flex items-center justify-between gap-4 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                        {post.division}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 truncate transition-colors">
                        {post.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span>조회 {post.views}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 모달 연동 */}
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
        <PostCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={(post) => {
            onAddPost(post);
            setIsCreateModalOpen(false);
          }}
        />

      </div>
    </section>
  );
}