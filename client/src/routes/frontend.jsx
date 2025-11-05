import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/frontend')({
  component: Frontend,
})
import React, { useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
  SandpackTests,
} from "@codesandbox/sandpack-react";
import { Play, Send, ChevronRight, X, CheckCircle2, AlertCircle, Terminal, Code2 } from 'lucide-react';

const files = {
  "index.html": `<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>React Todo</title>
  </head>
  <body>
    <div id='root'></div>
    <script type='module' src='/index.js'></script>
  </body>
</html>`,

  "index.js": `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`,

  "App.js": `import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), title: input.trim(), done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
      <h2>Todo App</h2>
      <input
        type='text'
        placeholder='Enter todo'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: '5px', width: '70%' }}
      />
      <button onClick={addTodo} style={{ marginLeft: '10px', padding: '5px 10px' }}>Add</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginTop: '10px' }}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: 'pointer',
                textDecoration: todo.done ? 'line-through' : 'none'
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,

  "package.json": `{
  "name": "sandpack-react-todo",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@testing-library/react": "14.0.0",
    "@testing-library/jest-dom": "6.2.0"
  },
  "devDependencies": {
    "vitest": "1.3.1"
  }
}`,

  "App.test.js": `import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Todo App', () => {
  it('adds a todo', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter todo');
    fireEvent.change(input, { target: { value: 'Learn React' } });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });
});`
};

function Frontend() {
  const [activeTab, setActiveTab] = useState('description');
  const [showTests, setShowTests] = useState(false);
  const [testStatus, setTestStatus] = useState(null);
  const [viewMode, setViewMode] = useState('code'); // 'code' or 'preview'

  const handleRunTests = () => {
    setShowTests(true);
    setTestStatus('running');
    setTimeout(() => setTestStatus('passed'), 800);
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        height: '60px',
        backgroundColor: '#000000',
        borderBottom: '1px solid rgba(0, 255, 136, 0.1)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            backgroundColor: '#00ff88',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
          <div style={{ fontWeight: '300', fontSize: '20px', letterSpacing: '0.05em' }}>
            CODEJUDGE
          </div>
        </div>

        <div style={{ 
          fontSize: '14px', 
          color: '#6b7280',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <ChevronRight size={14} />
          <span style={{ color: '#00ff88' }}>Build a Todo Application</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* View Toggle */}
        <div style={{
          display: 'flex',
          gap: '4px',
          backgroundColor: 'rgba(0, 255, 136, 0.1)',
          padding: '4px',
          borderRadius: '8px',
          marginRight: '16px'
        }}>
          <button
            onClick={() => setViewMode('code')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.05em',
              backgroundColor: viewMode === 'code' ? '#00ff88' : 'transparent',
              color: viewMode === 'code' ? '#000000' : '#9ca3af',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Code2 size={14} />
            CODE
          </button>
          <button
            onClick={() => setViewMode('preview')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.05em',
              backgroundColor: viewMode === 'preview' ? '#00ff88' : 'transparent',
              color: viewMode === 'preview' ? '#000000' : '#9ca3af',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Terminal size={14} />
            PREVIEW
          </button>
        </div>

        <button 
          onClick={handleRunTests}
          style={{
            backgroundColor: 'transparent',
            color: '#00ff88',
            border: '1px solid rgba(0, 255, 136, 0.3)',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
            letterSpacing: '0.05em'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
            e.target.style.borderColor = '#00ff88';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.borderColor = 'rgba(0, 255, 136, 0.3)';
          }}
        >
          <Play size={14} />
          RUN TESTS
        </button>

        <button style={{
          backgroundColor: '#00ff88',
          color: '#000000',
          border: 'none',
          padding: '10px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          letterSpacing: '0.05em',
          transition: 'all 0.2s',
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#00ddaa';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#00ff88';
          e.target.style.transform = 'scale(1)';
        }}
        >
          <Send size={14} />
          SUBMIT
        </button>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex',
        overflow: 'hidden'
      }}>
        {/* Left Panel - Problem Description */}
        <div style={{
          width: '450px',
          borderRight: '1px solid rgba(0, 255, 136, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#000000'
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid rgba(0, 255, 136, 0.1)',
            backgroundColor: '#0a0f0d'
          }}>
            {['description', 'solution', 'submissions'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '14px 20px',
                  border: 'none',
                  backgroundColor: activeTab === tab ? '#000000' : 'transparent',
                  color: activeTab === tab ? '#00ff88' : '#6b7280',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '2px solid #00ff88' : 'none',
                  textTransform: 'uppercase',
                  fontWeight: activeTab === tab ? '600' : '400',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  flex: 1,
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab) e.target.style.color = '#9ca3af';
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab) e.target.style.color = '#6b7280';
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
            backgroundColor: '#000000'
          }}>
            {activeTab === 'description' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <Code2 size={20} color="#00ff88" />
                  <h2 style={{ 
                    color: '#ffffff', 
                    margin: 0, 
                    fontSize: '20px',
                    fontWeight: '300',
                    letterSpacing: '0.02em'
                  }}>
                    Todo Application
                  </h2>
                </div>

                <div style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  color: '#00ff88',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  marginBottom: '24px',
                  border: '1px solid rgba(0, 255, 136, 0.2)',
                  letterSpacing: '0.05em'
                }}>
                  EASY
                </div>

                <p style={{ 
                  color: '#9ca3af', 
                  lineHeight: '1.7', 
                  fontSize: '14px',
                  marginBottom: '24px'
                }}>
                  Create a functional Todo application using React that allows users to add, toggle completion status, and remove todo items.
                </p>

                <div style={{
                  height: '1px',
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  marginBottom: '24px'
                }} />

                <h3 style={{ 
                  color: '#ffffff', 
                  marginTop: '0',
                  marginBottom: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Requirements
                </h3>
                <ul style={{ 
                  color: '#9ca3af', 
                  lineHeight: '1.8', 
                  fontSize: '13px', 
                  paddingLeft: '20px',
                  marginBottom: '24px'
                }}>
                  <li style={{ marginBottom: '8px' }}>Input field to enter new todos</li>
                  <li style={{ marginBottom: '8px' }}>Button to add todos to the list</li>
                  <li style={{ marginBottom: '8px' }}>Display list of all todos</li>
                  <li style={{ marginBottom: '8px' }}>Click on todo to toggle completion</li>
                  <li style={{ marginBottom: '8px' }}>Delete button to remove todos</li>
                </ul>

                <h3 style={{ 
                  color: '#ffffff', 
                  marginTop: '24px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Example
                </h3>
                <div style={{
                  backgroundColor: 'rgba(0, 255, 136, 0.05)',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 255, 136, 0.2)',
                  marginTop: '12px',
                  fontFamily: 'monospace',
                  fontSize: '12px'
                }}>
                  <div style={{ color: '#00ff88', fontWeight: '600', marginBottom: '8px' }}>
                    → Input: "Learn React"
                  </div>
                  <div style={{ color: '#6b7280', marginBottom: '8px' }}>
                    → Action: Click "Add"
                  </div>
                  <div style={{ color: '#ffffff' }}>
                    → Output: Todo appears in list
                  </div>
                </div>

                <h3 style={{ 
                  color: '#ffffff', 
                  marginTop: '24px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Constraints
                </h3>
                <ul style={{ 
                  color: '#9ca3af', 
                  lineHeight: '1.8', 
                  fontSize: '13px', 
                  paddingLeft: '20px'
                }}>
                  <li style={{ marginBottom: '8px' }}>Use React hooks (useState)</li>
                  <li style={{ marginBottom: '8px' }}>Each todo must have unique ID</li>
                  <li style={{ marginBottom: '8px' }}>Input clears after adding</li>
                </ul>
              </div>
            )}

            {activeTab === 'solution' && (
              <div style={{ color: '#9ca3af', fontSize: '14px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '16px' }}>
                  Solution Approach
                </h3>
                <div style={{
                  padding: '20px',
                  backgroundColor: 'rgba(0, 255, 136, 0.05)',
                  border: '1px solid rgba(0, 255, 136, 0.2)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <AlertCircle size={32} color="#6b7280" style={{ marginBottom: '12px' }} />
                  <p>Complete the challenge first to unlock solutions!</p>
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div style={{ color: '#9ca3af', fontSize: '14px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '16px' }}>
                  Your Submissions
                </h3>
                <div style={{
                  padding: '20px',
                  backgroundColor: 'rgba(0, 255, 136, 0.05)',
                  border: '1px solid rgba(0, 255, 136, 0.2)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <Terminal size={32} color="#6b7280" style={{ marginBottom: '12px' }} />
                  <p>No submissions yet. Submit your solution to see it here!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <SandpackProvider
            files={files}
            template="react"
            theme={{
              colors: {
                surface1: '#0a0f0d',
                surface2: '#000000',
                surface3: '#1a1f1d',
                clickable: '#9ca3af',
                base: '#ffffff',
                disabled: '#4b5563',
                hover: '#00ff88',
                accent: '#00ff88',
                error: '#ef4444',
                errorSurface: '#1a0a0a'
              },
              syntax: {
                plain: '#ffffff',
                comment: '#6b7280',
                keyword: '#00ddaa',
                tag: '#00ff88',
                punctuation: '#9ca3af',
                definition: '#00ccbb',
                property: '#00ff88',
                static: '#fbbf24',
                string: '#00ff88'
              },
              font: {
                body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                mono: '"Fira Code", "Cascadia Code", Consolas, monospace',
                size: '14px',
                lineHeight: '1.6'
              }
            }}
            options={{
              visibleFiles: Object.keys(files),
              activeFile: '/App.js'
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {viewMode === 'code' ? (
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                  <SandpackFileExplorer style={{ width: '200px', height: '100%' }} />
                  <SandpackCodeEditor 
                    closableTabs 
                    showTabs 
                    showLineNumbers
                    style={{ flex: 1, height: '100%' }}
                  />
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                  <SandpackPreview 
                    showOpenInCodeSandbox={false}
                    showRefreshButton
                    // style={{ width: '100%', height: }}
                    style={
                      {
                        width:"100%",
                        height:"770px"
                      }
                    }
                  />
                </div>
              )}

              {/* Test Cases Panel - Popup Modal */}
              {showTests && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000
                }}>
                  <div style={{
                    width: '700px',
                    maxHeight: '80vh',
                    backgroundColor: '#0a0f0d',
                    border: '1px solid rgba(0, 255, 136, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 0 40px rgba(0, 255, 136, 0.2)'
                  }}>
                    <div style={{
                      padding: '16px 24px',
                      backgroundColor: '#000000',
                      borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
                      fontWeight: '600',
                      fontSize: '13px',
                      color: '#00ff88',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {testStatus === 'running' && (
                          <div style={{ 
                            width: '6px', 
                            height: '6px', 
                            backgroundColor: '#fbbf24',
                            borderRadius: '50%',
                            animation: 'pulse 1s infinite'
                          }} />
                        )}
                        {testStatus === 'passed' && (
                          <CheckCircle2 size={16} color="#00ff88" />
                        )}
                        <span>Test Results</span>
                      </div>
                      <button
                        onClick={() => setShowTests(false)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#6b7280',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.color = '#ffffff'}
                        onMouseOut={(e) => e.target.style.color = '#6b7280'}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
                      <SandpackTests />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SandpackProvider>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
