import { Link, createFileRoute } from '@tanstack/react-router'
import { useAction } from 'convex/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/matchmaking')({
  component: MatchmakingApp,
})


import React, { useState, useEffect } from 'react';

  function MatchmakingApp() {
  const [currentPage, setCurrentPage] = useState('selection');
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');
  const [matchFound, setMatchFound] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const domains = [
    { 
      id: 'frontend', 
      name: 'Frontend', 
      gradient: 'from-emerald-400 to-teal-500',
      desc: 'React, TypeScript, UI/UX',
      icon: '</>'
    },
    { 
      id: 'sql', 
      name: 'Data', 
      gradient: 'from-blue-400 to-cyan-500',
      desc: 'SQL, Pipelines, Analytics',
      icon: '{ }'
    },
    { 
      id: 'web3', 
      name: 'Web3', 
      gradient: 'from-purple-400 to-pink-500',
      desc: 'Solidity, Smart Contracts',
      icon: '◈'
    },
    { 
      id: 'fullstack', 
      name: 'Full Stack', 
      gradient: 'from-orange-400 to-red-500',
      desc: 'End-to-End Development',
      icon: '⬡'
    }
  ];

  useEffect(() => {
    if (currentPage === 'matchmaking') {
      // Progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 100;
          return prev + (100 / 70);
        });
      }, 100);

      // Dots animation
      const dotsInterval = setInterval(() => {
        setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);

      // Match found at 4 seconds
      const matchTimeout = setTimeout(() => {
        setMatchFound(true);
        setOpponent({
          name: 'Rival_' + Math.floor(Math.random() * 9999),
          rating: Math.floor(Math.random() * 500) + 1500
        });
      }, 4000);

      // Redirect after 7 seconds
      const redirectTimeout = setTimeout(() => {
        window.location.href = `/${selectedDomain}`;
      }, 7000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(dotsInterval);
        clearTimeout(matchTimeout);
        clearTimeout(redirectTimeout);
      };
    }
  }, [currentPage, selectedDomain]);

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain.id);
    setCurrentPage('matchmaking');
  };

  // Selection Page
  if (currentPage === 'selection') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-8 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs tracking-widest text-gray-400">CODEJUDGE</span>
            </div>
            <h1 className="text-7xl font-light mb-4 tracking-tight">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Battle Domain
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Select a domain to begin your 1v1 competitive match</p>
          </div>

          {/* Domain Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {domains.map((domain, index) => (
              <button
                key={domain.id}
                onClick={() => handleDomainSelect(domain)}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 text-left overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`text-6xl font-light bg-gradient-to-br ${domain.gradient} bg-clip-text text-transparent`}>
                      {domain.icon}
                    </div>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${domain.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center`}>
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-medium mb-2">{domain.name}</h3>
                    <p className="text-sm text-gray-400">{domain.desc}</p>
                  </div>

                  {/* Bottom indicator */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${domain.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`} />
                </div>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 text-sm text-gray-500">
            <div>
              <span className="text-white font-medium">50K+</span> Active Players
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <div>
              <span className="text-white font-medium">2M+</span> Battles Completed
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-700" />
            <div>
              <span className="text-emerald-400 font-medium">Live</span> Matchmaking
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Matchmaking Page
  const domain = domains.find(d => d.id === selectedDomain);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8 relative overflow-hidden">
      {/* Subtle background orb */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br ${domain.gradient} opacity-5 rounded-full blur-3xl`}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Circular progress */}
        <div className="relative w-64 h-64 mx-auto mb-12">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
              className="transition-all duration-100"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={domain.gradient.includes('emerald') ? 'text-emerald-400' : domain.gradient.includes('blue') ? 'text-blue-400' : domain.gradient.includes('purple') ? 'text-purple-400' : 'text-orange-400'} stopColor="currentColor" />
                <stop offset="100%" className={domain.gradient.includes('teal') ? 'text-teal-500' : domain.gradient.includes('cyan') ? 'text-cyan-500' : domain.gradient.includes('pink') ? 'text-pink-500' : 'text-red-500'} stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {!matchFound ? (
              <>
                <div className="text-6xl font-light mb-2 tabular-nums">
                  {Math.floor(progress)}
                </div>
                <div className="text-xs tracking-widest text-gray-500 uppercase">
                  Searching{dots}
                </div>
              </>
            ) : (
              <>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${domain.gradient} flex items-center justify-center text-2xl font-bold mb-2 animate-scale`}>
                  {opponent?.name[0]}
                </div>
                <div className="text-xs text-gray-400">Opponent Found</div>
              </>
            )}
          </div>
        </div>

        {/* Domain label */}
        <div className="text-center mb-8">
          <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${domain.gradient} bg-opacity-10 border border-white/10`}>
            <span className="text-sm font-medium">{domain.name}</span>
          </div>
        </div>

        {/* Opponent info */}
        {matchFound && opponent && (
          <div className="animate-slideUp">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-400">VS</div>
                <div className={`h-px flex-1 mx-4 bg-gradient-to-r ${domain.gradient}`} />
                <div className="text-sm text-gray-400">1v1</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${domain.gradient} flex items-center justify-center text-lg font-bold`}>
                  {opponent.name[0]}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{opponent.name}</div>
                  <div className="text-xs text-gray-400">Rating: {opponent.rating}</div>
                </div>
              </div>
            </div>

            {/* Starting message */}
            <div className="text-center mt-6 text-sm text-gray-500">
              Battle begins in {Math.ceil((7000 - (progress * 70)) / 1000)}s
            </div>
          </div>
        )}

        {/* Minimal status indicator */}
        {!matchFound && (
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${domain.gradient} animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-scale {
          animation: scale 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}