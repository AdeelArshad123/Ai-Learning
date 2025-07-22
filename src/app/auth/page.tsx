'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function AuthPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });

  // Accessibility: refs for tab focus
  const loginTabRef = useRef<HTMLButtonElement>(null);
  const signupTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Keyboard navigation for tabs (optional, but tabs are now just for UI symmetry)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === loginTabRef.current && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        signupTabRef.current?.focus();
      } else if (document.activeElement === signupTabRef.current && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        loginTabRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Social login handlers
  const handleSocial = (provider: 'github' | 'google') => {
    window.location.href = `/api/auth/signin/${provider}`;
  };

  return (
    <main>
      <section className="glass" aria-label="Developer Authentication">
        <button
          className="theme-toggle"
          id="themeToggle"
          aria-label="Toggle theme"
          tabIndex={0}
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <span id="themeIcon">{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>
        <div className="tabs" role="tablist">
          <button
            className={`tab-btn active`}
            id="loginTab"
            ref={loginTabRef}
            role="tab"
            aria-selected={true}
            aria-controls="socialForm"
            tabIndex={0}
            type="button"
            style={{ pointerEvents: 'none', opacity: 0.7 }}
          >
            Developer Auth
          </button>
        </div>
        <div className="form active" id="socialForm" role="tabpanel" aria-labelledby="loginTab" style={{gap: '2rem'}}>
          <div style={{textAlign: 'center', fontSize: '1.08rem', color: 'var(--text)'}}>
            Sign in or sign up instantly with your developer account.
          </div>
          <div className="social-login">
            <button
              type="button"
              className="social-btn"
              id="githubLogin"
              aria-label="Login with GitHub"
              onClick={() => handleSocial('github')}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.922.43.372.823 1.104.823 2.227 0 1.607-.015 2.903-.015 3.297 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </button>
            <button
              type="button"
              className="social-btn"
              id="googleLogin"
              aria-label="Login with Google"
              onClick={() => handleSocial('google')}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.237-1.46 3.63-5.617 3.63-3.38 0-6.14-2.8-6.14-6.25s2.76-6.25 6.14-6.25c1.93 0 3.23.82 3.97 1.53l2.71-2.63C17.09 2.7 14.77 1.5 12.04 1.5 6.48 1.5 2 6.02 2 11.5s4.48 10 10.04 10c5.8 0 9.6-4.07 9.6-9.8 0-.66-.07-1.16-.17-1.68z"/></svg>
              Google
            </button>
          </div>
        </div>
        <style jsx global>{`
          :root {
            --glass-bg-light: rgba(255,255,255,0.65);
            --glass-bg-dark: rgba(30,34,40,0.65);
            --glass-border-light: rgba(255,255,255,0.35);
            --glass-border-dark: rgba(60,60,70,0.45);
            --primary: #2563eb;
            --secondary: #38bdf8;
            --text-light: #1e293b;
            --text-dark: #f1f5f9;
            --error: #ef4444;
            --success: #22c55e;
            --input-bg-light: rgba(255,255,255,0.85);
            --input-bg-dark: rgba(40,44,52,0.85);
            --input-border: #cbd5e1;
            --transition: 0.3s cubic-bezier(.4,0,.2,1);
          }
          [data-theme="dark"] {
            --glass-bg: var(--glass-bg-dark);
            --glass-border: var(--glass-border-dark);
            --text: var(--text-dark);
            --input-bg: var(--input-bg-dark);
          }
          [data-theme="light"] {
            --glass-bg: var(--glass-bg-light);
            --glass-border: var(--glass-border-light);
            --text: var(--text-light);
            --input-bg: var(--input-bg-light);
          }
          html {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%);
            min-height: 100vh;
            transition: background var(--transition);
          }
          [data-theme="dark"] html {
            background: linear-gradient(120deg, #18181b 0%, #1e293b 100%);
          }
          body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text);
            transition: color var(--transition);
          }
          .glass {
            background: var(--glass-bg);
            border: 1.5px solid var(--glass-border);
            box-shadow: 0 8px 32px 0 rgba(31,38,135,0.18);
            backdrop-filter: blur(18px) saturate(1.2);
            -webkit-backdrop-filter: blur(18px) saturate(1.2);
            border-radius: 1.5rem;
            padding: 2.5rem 2rem 2rem 2rem;
            max-width: 410px;
            width: 100%;
            margin: 1.5rem;
            transition: background var(--transition), border var(--transition);
            position: relative;
          }
          .tabs {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          .tab-btn {
            background: none;
            border: none;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text);
            padding: 0.5rem 1.2rem;
            border-radius: 999px;
            cursor: pointer;
            transition: background var(--transition), color var(--transition);
            position: relative;
            outline: none;
          }
          .tab-btn.active, .tab-btn:focus-visible {
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            color: #fff;
            box-shadow: 0 2px 12px 0 rgba(56,189,248,0.08);
          }
          .form {
            display: none;
            flex-direction: column;
            gap: 1.2rem;
            animation: fadeIn 0.5s;
          }
          .form.active {
            display: flex;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .social-login {
            display: flex;
            gap: 1rem;
            margin: 1.2rem 0 0.5rem 0;
            justify-content: center;
          }
          .social-btn {
            flex: 1 1 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
            padding: 0.7rem 0.5rem;
            border-radius: 0.8rem;
            border: 1.5px solid var(--input-border);
            background: var(--input-bg);
            color: var(--text);
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: background var(--transition), border var(--transition), color var(--transition), box-shadow var(--transition);
            box-shadow: 0 1px 4px 0 rgba(31,38,135,0.06);
          }
          .social-btn:hover, .social-btn:focus-visible {
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            color: #fff;
            border-color: var(--primary);
            box-shadow: 0 2px 12px 0 rgba(56,189,248,0.12);
          }
          .theme-toggle {
            position: absolute;
            top: 1.2rem;
            right: 1.2rem;
            background: none;
            border: none;
            color: var(--primary);
            font-size: 1.3rem;
            cursor: pointer;
            border-radius: 50%;
            padding: 0.3rem;
            transition: background var(--transition), color var(--transition);
          }
          .theme-toggle:hover, .theme-toggle:focus-visible {
            background: var(--primary);
            color: #fff;
          }
          @media (max-width: 600px) {
            .glass {
              padding: 1.2rem 0.5rem 1.2rem 0.5rem;
              max-width: 98vw;
            }
            .tabs {
              gap: 0.5rem;
            }
          }
        `}</style>
      </section>
    </main>
  );
} 