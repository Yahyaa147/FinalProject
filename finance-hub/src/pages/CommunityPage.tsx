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
  Filter,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { mockForumCategories, mockForumThreads, mockForumPosts } from '../data/mockData';
import { getRelativeTime } from '../utils/helpers';
import type { ForumCategory, ForumThread, ForumPost } from '../types';

const ForumHome = () => {
  const [categories] = useState<ForumCategory[]>(mockForumCategories);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 rounded-xl p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-3">Community Forum</h1>
          <p className="text-blue-100 text-lg">
            Connect with fellow investors, share insights, and learn from the community.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">12,847</p>
              <p className="text-sm text-gray-600">Total Members</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">48,392</p>
              <p className="text-sm text-gray-600">Total Posts</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <p className="text-sm text-gray-600">Active Today</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Top Contributors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
            <Users className="h-4 w-4" />
            <span>All Forums</span>
          </button>
          <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <MessageSquare className="h-4 w-4" />
            <span>Discussions</span>
          </button>
        </div>
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Forum Categories</h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {categories.map((category, index) => (
            <div key={category.id} className={`${index !== categories.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <Link 
                to={`/community/${category.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{category.threadCount} threads</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{category.postCount} posts</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Last activity: {getRelativeTime(category.lastActivity)}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="space-y-4">
            {mockForumThreads.slice(0, 5).map((thread) => (
              <div key={thread.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <Link 
                      to={`/community/${thread.categoryId}/${thread.id}`}
                      className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
                    >
                      {thread.title}
                    </Link>
                    <p className="text-sm text-gray-500">by {thread.author}</p>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span>{thread.replies} replies</span>
                    <span>•</span>
                    <span>{getRelativeTime(thread.lastActivity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

  useEffect(() => {
    const foundCategory = mockForumCategories.find(cat => cat.id === categoryId);
    setCategory(foundCategory || null);
    
    const categoryThreads = mockForumThreads.filter(thread => thread.categoryId === categoryId);
    setThreads(categoryThreads);
  }, [categoryId]);

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!category) {
    return <div className="text-center py-8">Category not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${category.color}`}>
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Thread</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search threads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Threads List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredThreads.map((thread) => (
            <div key={thread.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {thread.isPinned && <Pin className="h-4 w-4 text-orange-500" />}
                    {thread.isLocked && <Lock className="h-4 w-4 text-gray-500" />}
                    <Link 
                      to={`/community/${categoryId}/${thread.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                    >
                      {thread.title}
                    </Link>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{thread.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>by <span className="font-medium">{thread.author}</span></span>
                    <span>•</span>
                    <span>{getRelativeTime(thread.createdAt)}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{thread.views} views</span>
                    </div>
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <div className="text-sm text-gray-900 font-medium">{thread.replies} replies</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last: {getRelativeTime(thread.lastActivity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ThreadView = () => {
  const { categoryId, threadId } = useParams<{ categoryId: string; threadId: string }>();
  const [thread, setThread] = useState<ForumThread | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);

  useEffect(() => {
    const foundThread = mockForumThreads.find(t => t.id === threadId);
    setThread(foundThread || null);
    
    const threadPosts = mockForumPosts.filter(post => post.threadId === threadId);
    setPosts(threadPosts);
  }, [threadId]);

  if (!thread) {
    return <div className="text-center py-8">Thread not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Thread Header */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          {thread.isPinned && <Pin className="h-5 w-5 text-orange-500" />}
          {thread.isLocked && <Lock className="h-5 w-5 text-gray-500" />}
          <h1 className="text-2xl font-bold text-gray-900">{thread.title}</h1>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Started by <span className="font-medium text-gray-700">{thread.author}</span></span>
          <span>•</span>
          <span>{getRelativeTime(thread.createdAt)}</span>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{thread.views} views</span>
          </div>
          <span>•</span>
          <span>{thread.replies} replies</span>
        </div>
      </div>

      {/* Original Post */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
            {thread.author.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-900">{thread.author}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{getRelativeTime(thread.createdAt)}</span>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700">{thread.content}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
              <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>Like</span>
              </button>
              <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-900">{post.author}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{getRelativeTime(post.date)}</span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700">{post.content}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes} likes</span>
                  </button>
                  <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Form */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Post a Reply</h3>
        <div className="space-y-4">
          <textarea
            rows={4}
            placeholder="Write your reply..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-end">
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Post Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/community' || location.pathname === '/community/';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        {!isHomePage && (
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link to="/community" className="hover:text-primary-600 transition-colors">
                Community
              </Link>
              <span>›</span>
              <span className="text-gray-900">Current Page</span>
            </div>
          </nav>
        )}

        {/* Content */}
        <Routes>
          <Route index element={<ForumHome />} />
          <Route path=":categoryId" element={<CategoryView />} />
          <Route path=":categoryId/:threadId" element={<ThreadView />} />
        </Routes>
      </div>
    </div>
  );
};

export default CommunityPage;
