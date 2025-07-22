"use client";
import React, { useState, useRef, useEffect } from "react";
import { signIn } from 'next-auth/react';

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close modal on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Close modal on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  const handleSocial = (provider: 'github' | 'google') => {
    signIn(provider);
  };

  if (!open) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal" ref={modalRef} role="dialog" aria-modal="true" aria-label="Developer Authentication">
        <button
          className="theme-toggle"
          aria-label="Toggle theme"
          tabIndex={0}
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>
        <button className="auth-modal-close" aria-label="Close modal" onClick={onClose}>
          <svg width="28" height="28" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/></svg>
        </button>
        <div className="auth-modal-header">
          <span className="auth-modal-title">Developer Auth</span>
        </div>
        <div className="form active" id="socialForm" role="tabpanel" aria-labelledby="loginTab" style={{gap: '2rem'}}>
          <div style={{textAlign: 'center', fontSize: '1.08rem', color: 'var(--text)', marginBottom: '0.5rem'}}>
            Sign in or sign up instantly with your developer account.
          </div>
          <div className="auth-modal-divider">
            <span>or</span>
          </div>
          <div className="social-login">
            <button
              type="button"
              className="social-btn social-btn-github"
              id="githubLogin"
              aria-label="Login with GitHub"
              onClick={() => handleSocial('github')}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.922.43.372.823 1.104.823 2.227 0 1.607-.015 2.903-.015 3.297 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"/></svg>
              <span>GitHub</span>
            </button>
            <button
              type="button"
              className="social-btn social-btn-google"
              id="googleLogin"
              aria-label="Login with Google"
              onClick={() => handleSocial('google')}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.237-1.46 3.63-5.617 3.63-3.38 0-6.14-2.8-6.14-6.25s2.76-6.25 6.14-6.25c1.93 0 3.23.82 3.97 1.53l2.71-2.63C17.09 2.7 14.77 1.5 12.04 1.5 6.48 1.5 2 6.02 2 11.5s4.48 10 10.04 10c5.8 0 9.6-4.07 9.6-9.8 0-.66-.07-1.16-.17-1.68z"/></svg>
              <span>Google</span>
            </button>
          </div>
        </div>
        <style jsx global>{`
          .auth-modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(20,22,30,0.55);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s;
          }
          .auth-modal {
            position: relative;
            max-width: 410px;
            width: 100%;
            background: var(--glass-bg);
            border: 1.5px solid var(--glass-border);
            box-shadow: 0 12px 48px 0 rgba(31,38,135,0.22);
            backdrop-filter: blur(22px) saturate(1.3);
            -webkit-backdrop-filter: blur(22px) saturate(1.3);
            border-radius: 1.5rem;
            padding: 2.5rem 2rem 2rem 2rem;
            margin: 1.5rem;
            transition: background var(--transition), border var(--transition);
            animation: modalPop 0.3s;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .auth-modal-close {
            position: absolute;
            top: 1.1rem;
            right: 1.1rem;
            background: none;
            border: none;
            color: var(--primary);
            font-size: 2rem;
            cursor: pointer;
            border-radius: 50%;
            padding: 0.1rem 0.5rem;
            transition: background var(--transition), color var(--transition);
            z-index: 10;
            opacity: 0.7;
          }
          .auth-modal-close:hover, .auth-modal-close:focus-visible {
            background: var(--primary);
            color: #fff;
            opacity: 1;
          }
          .auth-modal-header {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1.2rem;
          }
          .auth-modal-title {
            font-size: 1.35rem;
            font-weight: 700;
            letter-spacing: 0.01em;
            color: var(--text);
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .auth-modal-divider {
            width: 100%;
            display: flex;
            align-items: center;
            margin: 1.2rem 0 1.2rem 0;
          }
          .auth-modal-divider span {
            color: var(--text);
            font-size: 1rem;
            font-weight: 500;
            margin: 0 1rem;
            opacity: 0.7;
          }
          .auth-modal-divider:before, .auth-modal-divider:after {
            content: '';
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            opacity: 0.18;
          }
          .social-login {
            display: flex;
            gap: 1.2rem;
            margin: 0.5rem 0 0.5rem 0;
            justify-content: center;
            width: 100%;
          }
          .social-btn {
            flex: 1 1 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.7rem;
            padding: 0.85rem 0.5rem;
            border-radius: 0.9rem;
            border: 1.5px solid var(--input-border);
            background: var(--input-bg);
            color: var(--text);
            font-weight: 600;
            font-size: 1.08rem;
            cursor: pointer;
            transition: background var(--transition), border var(--transition), color var(--transition), box-shadow var(--transition), transform 0.15s;
            box-shadow: 0 1px 4px 0 rgba(31,38,135,0.08);
            outline: none;
          }
          .social-btn-github svg {
            color: #181717;
          }
          .social-btn-google svg {
            color: #ea4335;
          }
          .social-btn:hover, .social-btn:focus-visible {
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            color: #fff;
            border-color: var(--primary);
            box-shadow: 0 2px 12px 0 rgba(56,189,248,0.14);
            transform: translateY(-2px) scale(1.03);
          }
          .social-btn:active {
            transform: scale(0.98);
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes modalPop {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @media (max-width: 600px) {
            .auth-modal {
              padding: 1.2rem 0.5rem 1.2rem 0.5rem;
              max-width: 98vw;
            }
            .auth-modal-header {
              margin-bottom: 0.7rem;
            }
            .social-login {
              gap: 0.5rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
} 