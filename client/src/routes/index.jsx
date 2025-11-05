import { Link, createFileRoute } from '@tanstack/react-router'
import { useMutation } from 'convex/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'
import { Navigate } from '@tanstack/react-router'

import React, { useState, useEffect } from 'react';
import { Code2, Database, Hexagon, Terminal, ArrowRight, Sparkles, Circle } from 'lucide-react';

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      title: 'Frontend',
      subtitle: 'React • TypeScript • UI/UX',
      icon: Code2,
      path: '/frontend',
      color: '#00ff88',
      particles: 12
    },
    {
      title: 'Data',
      subtitle: 'SQL • Pipelines • Analytics',
      icon: Database,
      path: '/sql',
      color: '#00ddaa',
      particles: 10
    },
    {
      title: 'Web3',
      subtitle: 'Solidity • Smart Contracts',
      icon: Hexagon,
      path: '/web3',
      color: '#00ccbb',
      particles: 14
    },
    {
      title: 'Full Stack',
      subtitle: 'End-to-End Development',
      icon: Terminal,
      path: '/fullstack',
      color: '#00ffaa',
      particles: 11
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Custom Cursor Trail */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="fixed w-1 h-1 bg-emerald-400 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}

      {/* Minimalist Header */}
      <header className="relative z-50 border-b border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping absolute" />
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
            </div>
            <span className="text-xl font-light tracking-wider">CODEJUDGE</span>
          </div>
          <button className="text-sm tracking-wider hover:text-emerald-400 transition-colors" onClick={()=>{
            window.location.href = '/problems';
          }}>
            ENTER →
          </button>
        </div>
      </header>

      {/* Hero Section - Unique Layout */}
      <main className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-12 gap-8 min-h-screen items-center py-20">
          
          {/* Left Side - Text */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="text-xs tracking-widest text-emerald-400 uppercase">
                  50K+ Developers
                </span>
              </div>
              
              <h1 className="text-7xl font-light leading-none">
                Code.
                <br />
                <span className="text-emerald-400 font-normal">Practice.</span>
                <br />
                Master.
              </h1>
              
              <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                Real challenges. Instant feedback. Measurable growth.
              </p>
            </div>

            {/* Stats - Minimalist */}
            <div className="flex gap-12 pt-8">
              {[
                { num: '500+', label: 'Challenges' },
                { num: '98%', label: 'Success' },
                { num: '24/7', label: 'Available' }
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl font-light text-emerald-400">
                    {stat.num}
                  </div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Interactive Cards */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat, idx) => {
                const Icon = cat.icon;
                const isHovered = hoveredCard === idx;
                
                return (
                  <button
                    key={idx}
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => window.location.href = cat.path}
                    className="relative h-48 bg-gradient-to-br from-zinc-900 to-black border border-emerald-500/20 rounded-2xl p-6 overflow-hidden group"
                    style={{
                      transform: isHovered ? 'scale(1.03) rotate(1deg)' : 'scale(1)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {/* Particle Effect on Hover */}
                    {isHovered && [...Array(cat.particles)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          background: cat.color,
                          left: '50%',
                          top: '50%',
                          animation: `explode 0.8s ease-out forwards`,
                          animationDelay: `${i * 0.05}s`,
                          opacity: 0
                        }}
                      />
                    ))}

                    {/* Glow Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${cat.color}15, transparent 70%)`
                      }}
                    />

                    {/* Animated Border Line */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${cat.color}80, transparent)`,
                        height: '1px',
                        bottom: 0
                      }}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-light mb-1.5">{cat.title}</h3>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {cat.subtitle}
                          </p>
                        </div>
                        <Icon 
                          className="w-8 h-8 transition-all duration-500 opacity-40 group-hover:opacity-100"
                          style={{
                            color: isHovered ? cat.color : 'white',
                            transform: isHovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)'
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-600 uppercase tracking-wider">
                          Explore
                        </div>
                        <ArrowRight 
                          className="w-4 h-4 transition-all duration-300"
                          style={{
                            color: cat.color,
                            opacity: isHovered ? 1 : 0.3,
                            transform: isHovered ? 'translateX(0)' : 'translateX(-5px)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div 
                      className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, ${cat.color}20, transparent)`
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Journey Section - Unique Presentation */}
        <div className="py-32 border-t border-emerald-500/10">
          <div className="grid grid-cols-12 gap-16 items-center">
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <h2 className="text-5xl font-light leading-tight">
                Your path to
                <br />
                <span className="text-emerald-400">mastery</span>
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Every expert was once a beginner. Start your transformation today.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Choose Your Domain', desc: 'Pick the path that excites you' },
                  { step: '02', title: 'Solve Real Challenges', desc: 'Learn by building, not watching' },
                  { step: '03', title: 'Track Your Growth', desc: 'See yourself improve daily' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-6 p-6 border border-emerald-500/10 rounded-2xl bg-gradient-to-r from-zinc-900/50 to-transparent transition-all duration-500 hover:border-emerald-500/30 cursor-pointer"
                    style={{
                      opacity: activeSection === idx ? 1 : 0.4,
                      transform: activeSection === idx ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <div className="text-4xl font-light text-emerald-400/30">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-light mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <Circle 
                      className="w-6 h-6 self-center"
                      style={{
                        color: activeSection === idx ? '#00ff88' : '#333',
                        fill: activeSection === idx ? '#00ff88' : 'none'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-32 text-center">
          <div className="inline-block">
            <div className="text-sm text-emerald-400 mb-4 tracking-widest uppercase">
              Ready to begin?
            </div>
            <button className="group px-12 py-4 bg-emerald-400 text-black text-lg font-medium rounded-full hover:bg-emerald-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50">
              Start Your Journey
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-emerald-500/10 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center text-sm text-gray-600">
          <span className="text-emerald-400">◆</span> CODEJUDGE 2025
        </div>
      </footer>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes explode {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(var(--x, 0) * 100px),
              calc(var(--y, 0) * 100px)
            ) scale(0);
          }
        }

        @keyframes explode {
          0% {
            opacity: 1;
            transform: translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: translate(
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            );
          }
        }
      `}</style>
    </div>
  );
};


export const Route = createFileRoute('/')({
  component: Home,
})