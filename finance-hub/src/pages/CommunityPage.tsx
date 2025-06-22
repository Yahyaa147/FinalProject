import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  Eye, 
  Clock, 
  Pin,
  Lock,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { mockForumCategories, mockForumThreads, mockForumPosts } from '../data/mockData';
import { getRelativeTime } from '../utils/helpers';
import type { ForumCategory, ForumThread, ForumPost } from '../types';

const ForumHome = () => {
  const [categories] = useState<ForumCategory[]>(mockForumCategories);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Discussion Forums</h2>
        <p className="text-gray-600">
          Connect with fellow investors, share insights, and learn from the community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <Link 
                    to={`/community/${category.id}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
              <MessageSquare className="h-6 w-6 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">{category.threadCount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Threads</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{category.postCount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {mockForumThreads.slice(0, 5).map((thread) => {
            const category = categories.find(c => c.id === thread.categoryId);
            return (
              <div key={thread.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {thread.isPinned && <Pin className="h-4 w-4 text-orange-500" />}
                    {thread.isLocked && <Lock className="h-4 w-4 text-gray-500" />}
                    <h4 className="font-medium text-gray-900 hover:text-primary-600">
                      <Link to={`/community/${thread.categoryId}/${thread.id}`}>
                        {thread.title}
                      </Link>
                    </h4>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>by {thread.username}</span>
                    <span>{category?.name}</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {getRelativeTime(thread.lastActivity)}
                    </span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {thread.replies}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {thread.views}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CategoryView = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<ForumCategory | null>(null);
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'replies'>('recent');

  useEffect(() => {
    // Find category
    const foundCategory = mockForumCategories.find(c => c.id === categoryId);
    setCategory(foundCategory || null);

    // Get threads for this category
    let categoryThreads = mockForumThreads.filter(t => t.categoryId === categoryId);

    // Apply search filter
    if (searchTerm) {
      categoryThreads = categoryThreads.filter(thread =>
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        categoryThreads.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
        break;
      case 'popular':
        categoryThreads.sort((a, b) => b.views - a.views);
        break;
      case 'replies':
        categoryThreads.sort((a, b) => b.replies - a.replies);
        break;
    }

    setThreads(categoryThreads);
  }, [categoryId, searchTerm, sortBy]);

  if (!category) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Category not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
            <p className="text-gray-600">{category.description}</p>
          </div>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Thread
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search threads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="relative">            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'replies')}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="replies">Most Replies</option>
            </select>
          </div>
        </div>
      </div>

      {/* Threads List */}
      <div className="card">
        {threads.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {threads.map((thread) => (
              <div key={thread.id} className="py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {thread.isPinned && <Pin className="h-4 w-4 text-orange-500" />}
                      {thread.isLocked && <Lock className="h-4 w-4 text-gray-500" />}
                      <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600">
                        <Link to={`/community/${categoryId}/${thread.id}`}>
                          {thread.title}
                        </Link>
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{thread.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Started by {thread.username}</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {getRelativeTime(thread.date)}
                      </span>
                      <span>Last activity {getRelativeTime(thread.lastActivity)}</span>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600 ml-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {thread.replies}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {thread.views}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchTerm ? 'No threads found matching your search.' : 'No threads in this category yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ThreadView = () => {
  const { categoryId, threadId } = useParams<{ categoryId: string; threadId: string }>();
  const [thread, setThread] = useState<ForumThread | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);

  useEffect(() => {
    // Find thread
    const foundThread = mockForumThreads.find(t => t.id === threadId);
    setThread(foundThread || null);

    // Get posts for this thread
    const threadPosts = mockForumPosts.filter(p => p.threadId === threadId);
    setPosts(threadPosts);
  }, [threadId]);

  if (!thread) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Thread not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/community" className="hover:text-primary-600">Forums</Link>
          <span className="mx-2">›</span>
          <Link to={`/community/${categoryId}`} className="hover:text-primary-600">Category</Link>
          <span className="mx-2">›</span>
          <span>{thread.title}</span>
        </nav>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{thread.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Started by {thread.username}</span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {getRelativeTime(thread.date)}
              </span>
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {thread.views} views
              </span>
            </div>
          </div>
          <button className="btn-primary">
            Reply
          </button>
        </div>
      </div>

      {/* Original Post */}
      <div className="card mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {thread.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-gray-900">{thread.username}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{getRelativeTime(thread.date)}</span>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700">{thread.content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {post.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-900">{post.username}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{getRelativeTime(post.date)}</span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{post.content}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <button className="text-sm text-gray-600 hover:text-primary-600 flex items-center">
                    👍 {post.likes} likes
                  </button>
                  <button className="text-sm text-primary-600 hover:text-primary-700">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Form Placeholder */}
      <div className="card mt-6">
        <h3 className="font-medium text-gray-900 mb-4">Post a Reply</h3>
        <p className="text-gray-600 text-sm">
          Reply functionality will be implemented with a rich text editor and form validation.
        </p>
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const location = useLocation();

  const navItems = [
    { path: '/community', label: 'All Forums', icon: Users },
    { path: '/community/discussions', label: 'Discussions', icon: MessageSquare },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
        <p className="mt-2 text-gray-600">
          Connect with fellow investors, share insights, and learn from the community.
        </p>
      </div>

      {/* Sub Navigation - Only show on main community pages */}
      {(location.pathname === '/community' || location.pathname.includes('/community/discussions')) && (
        <div className="mb-8">
          <nav className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.path === location.pathname;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                    isActive
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Content */}
      <Routes>
        <Route index element={<ForumHome />} />
        <Route path=":categoryId" element={<CategoryView />} />
        <Route path=":categoryId/:threadId" element={<ThreadView />} />
      </Routes>
    </div>
  );
};

export default CommunityPage;
