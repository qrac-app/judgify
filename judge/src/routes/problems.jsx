import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/problems')({
  component: QuestionList,
})
import React, { useState, useEffect } from 'react';
import { Code2, Calendar, Heart, Filter, Search, ArrowLeft, ArrowRight } from 'lucide-react';

const QuestionList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const questions = [
    { id: 1, title: "Build a Responsive TODO App", level: "easy", category: "frontend", description: "Create a responsive TODO app with add/edit/delete and persistent storage.", tags: ["React", "CSS Grid", "LocalStorage"], likes: 230, posted: "2025-10-25" },
    { id: 2, title: "E-commerce Database Schema", level: "medium", category: "schema-design", description: "Design normalized SQL tables for users, orders, and products.", tags: ["SQL", "Normalization", "ER Diagram"], likes: 148, posted: "2025-10-22" },
    { id: 3, title: "NFT Marketplace Smart Contract", level: "hard", category: "web3", description: "Write a Solidity contract for minting and trading NFTs with royalty support.", tags: ["Solidity", "ERC721", "Hardhat"], likes: 312, posted: "2025-09-30" },
    { id: 4, title: "Portfolio Website with Animations", level: "easy", category: "frontend", description: "Build a modern portfolio website with smooth scroll and framer motion animations.", tags: ["React", "Framer Motion", "Tailwind"], likes: 275, posted: "2025-10-18" },
    { id: 5, title: "Ride-Sharing Schema Design", level: "medium", category: "schema-design", description: "Design a scalable database for a ride-sharing platform with trip logs and payments.", tags: ["PostgreSQL", "Joins", "Keys"], likes: 201, posted: "2025-09-10" },
    { id: 6, title: "Decentralized Voting Smart Contract", level: "hard", category: "web3", description: "Implement a Solidity voting contract ensuring only one vote per address.", tags: ["Blockchain", "Solidity", "Security"], likes: 187, posted: "2025-08-29" },
    { id: 7, title: "Chat UI using React Hooks", level: "easy", category: "frontend", description: "Design a simple real-time chat interface using React and basic WebSockets.", tags: ["React", "Hooks", "WebSocket"], likes: 112, posted: "2025-09-15" },
    { id: 8, title: "Social Media Schema", level: "medium", category: "schema-design", description: "Create SQL tables for posts, likes, comments, and users efficiently.", tags: ["SQL", "Design", "Indexes"], likes: 250, posted: "2025-09-08" },
    { id: 9, title: "Token Swap Smart Contract", level: "hard", category: "web3", description: "Develop a Solidity DEX smart contract for swapping ERC20 tokens securely.", tags: ["Web3", "Solidity", "DEX"], likes: 355, posted: "2025-07-12" },
    { id: 10, title: "Weather Dashboard UI", level: "easy", category: "frontend", description: "Create a weather dashboard fetching data from OpenWeather API.", tags: ["API", "React", "Axios"], likes: 159, posted: "2025-08-20" },
    { id: 11, title: "Inventory Management DB Schema", level: "medium", category: "schema-design", description: "Design a relational schema for managing product stock and suppliers.", tags: ["SQL", "Inventory", "Keys"], likes: 143, posted: "2025-09-02" },
    { id: 12, title: "DeFi Lending Protocol", level: "hard", category: "web3", description: "Design and implement a Solidity smart contract simulating lending and borrowing.", tags: ["SmartContract", "DeFi", "Security"], likes: 310, posted: "2025-08-01" },
    { id: 13, title: "Music Player App", level: "easy", category: "frontend", description: "Build a React music player with play/pause and playlist features.", tags: ["React", "Hooks", "Audio API"], likes: 189, posted: "2025-09-21" },
    { id: 14, title: "Online Learning Platform Schema", level: "medium", category: "schema-design", description: "Model courses, lessons, and student progress efficiently in SQL.", tags: ["SQL", "Schema", "Optimization"], likes: 220, posted: "2025-08-10" },
    { id: 15, title: "Crowdfunding Smart Contract", level: "hard", category: "web3", description: "Write a Solidity contract to manage project funding with milestone verification.", tags: ["Solidity", "Crowdfunding", "Events"], likes: 335, posted: "2025-07-05" },
    { id: 16, title: "Responsive Landing Page", level: "easy", category: "frontend", description: "Design a responsive landing page using TailwindCSS and grid layout.", tags: ["HTML", "Tailwind", "Flexbox"], likes: 190, posted: "2025-09-13" },
    { id: 17, title: "Banking System Schema Design", level: "medium", category: "schema-design", description: "Design a robust SQL schema for customer accounts, transactions, and logs.", tags: ["SQL", "Schema", "Transactions"], likes: 267, posted: "2025-08-26" },
    { id: 18, title: "DAO Governance Smart Contract", level: "hard", category: "web3", description: "Create a DAO contract where token holders can vote on proposals.", tags: ["Solidity", "DAO", "Governance"], likes: 402, posted: "2025-07-18" },
    { id: 19, title: "Quiz App with Leaderboard", level: "easy", category: "frontend", description: "Develop a quiz app with timer and live leaderboard using React.", tags: ["React", "Timer", "State"], likes: 298, posted: "2025-10-01" },
    { id: 20, title: "Hospital Management Schema", level: "medium", category: "schema-design", description: "Design a complete SQL database for hospital patients, staff, and billing.", tags: ["Database", "Schema", "SQL"], likes: 176, posted: "2025-09-11" }
  ];

  const levelColors = {
    easy: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    hard: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' }
  };

  const categoryColors = {
    frontend: '#00ff88',
    'schema-design': '#00ddaa',
    web3: '#00ccbb'
  };

  const filteredQuestions = questions.filter(q => {
    const matchesLevel = selectedLevel === 'all' || q.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const currentQuestions = filteredQuestions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLevel, selectedCategory, searchTerm]);

  const handleClick = (category) => {
    if (category === "frontend") {
      window.location.href = '/frontend';
    } else if (category === "schema-design") {
      window.location.href = '/sql';
    } else if (category === "web3") {
      window.location.href = '/web3';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-emerald-500/10 sticky top-0 z-50 backdrop-blur-xl bg-black/80">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping absolute" />
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              </div>
              <span className="text-xl font-light tracking-wider">CODEJUDGE</span>
            </div>
            <button 
              onClick={() => window.location.href = '/'}
              className="text-sm tracking-wider hover:text-emerald-400 transition-colors"
            >
              ← BACK
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-16">
        {/* Title & Stats */}
        <div className="mb-12">
          <h1 className="text-5xl font-light mb-4">
            Coding <span className="text-emerald-400">Challenges</span>
          </h1>
          <p className="text-gray-500 text-lg">
            {filteredQuestions.length} problems available
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-emerald-500/20 rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/40 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Difficulty:</span>
              {['all', 'easy', 'medium', 'hard'].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedLevel === level
                      ? 'bg-emerald-500 text-black'
                      : 'bg-zinc-900 text-gray-400 hover:text-white border border-emerald-500/20'
                  }`}
                >
                  {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-emerald-500/10" />

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Category:</span>
              {['all', 'frontend', 'schema-design', 'web3'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-black'
                      : 'bg-zinc-900 text-gray-400 hover:text-white border border-emerald-500/20'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat === 'schema-design' ? 'Database' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {currentQuestions.map((q) => {
            const levelColor = levelColors[q.level];
            const isHovered = hoveredCard === q.id;
            
            return (
              <button
                key={q.id}
                onClick={() => handleClick(q.category)}
                onMouseEnter={() => setHoveredCard(q.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-gradient-to-br from-zinc-900 to-black border border-emerald-500/20 rounded-2xl p-6 text-left overflow-hidden transition-all duration-300 hover:border-emerald-500/40"
                style={{
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${categoryColors[q.category]}10, transparent 70%)`
                  }}
                />

                {/* Header */}
                <div className="relative flex items-start justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${levelColor.bg} ${levelColor.text} ${levelColor.border}`}>
                    {q.level.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(q.posted).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="relative mb-4">
                  <h3 className="text-lg font-light mb-2 group-hover:text-emerald-400 transition-colors">
                    {q.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {q.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="relative flex flex-wrap gap-2 mb-4">
                  {q.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-black/50 border border-emerald-500/20 text-gray-400 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="relative flex items-center justify-between pt-4 border-t border-emerald-500/10">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span>{q.likes}</span>
                  </div>
                  <div 
                    className="text-xs uppercase tracking-wider font-medium"
                    style={{ color: categoryColors[q.category] }}
                  >
                    {q.category === 'schema-design' ? 'Database' : q.category}
                  </div>
                </div>

                {/* Hover Border Animation */}
                <div 
                  className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 transition-all duration-300"
                  style={{ width: isHovered ? '100%' : '0%' }}
                />
              </button>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-lg border border-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed hover:border-emerald-500/40 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPage === i + 1
                      ? 'bg-emerald-400 w-8'
                      : 'bg-zinc-700 hover:bg-zinc-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-lg border border-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed hover:border-emerald-500/40 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {currentQuestions.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 rounded-2xl bg-zinc-900 border border-emerald-500/20 mb-4">
              <Filter className="w-12 h-12 text-gray-600 mx-auto" />
            </div>
            <h3 className="text-xl font-light mb-2">No problems found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
};


// export default QuestionList;
