import React from "react";
import { FaBookOpen, FaCode } from "react-icons/fa";

const languages = [
  {
    name: "JavaScript",
    icon: (
      // JS logo
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#F7DF1E"/><path d="M8.5 8.5h15v15h-15z" fill="#F7DF1E"/><path d="M19.5 23.5c.5.8 1.1 1.5 2.3 1.5 1.1 0 1.8-.5 1.8-1.2 0-.8-.6-1.1-2-1.6l-.7-.3c-2-0.7-3.3-1.6-3.3-3.5 0-1.7 1.3-3 3.4-3 1.5 0 2.6.5 3.4 1.8l-1.8 1.1c-.4-.7-.8-1-1.6-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.5 1.4l.7.3c2.3.8 3.6 1.7 3.6 3.7 0 2.1-1.7 3.2-4 3.2-2.2 0-3.6-1-4.3-2.3l1.9-1.1zm-8.2.2c.4.7.8 1.3 1.7 1.3.8 0 1.3-.3 1.3-1.6v-7.1h2.3v7.2c0 2.4-1.4 3.5-3.4 3.5-1.8 0-2.8-.9-3.3-2l1.9-1.1z" fill="#222"/></svg>
    ),
    description: "JavaScript is the language of the web, powering interactive websites and web apps everywhere.",
    learnMore: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    examples: "https://github.com/topics/javascript",
    accent: "border-yellow-400",
    circle: "bg-yellow-400/90"
  },
  {
    name: "Python",
    icon: (
      // Python logo
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#306998"/><path d="M16 7c-2.2 0-4.2.2-5.7 1.2C8.2 9.2 8 10.7 8 12.5V15h8v2H8c-2.2 0-4 1.8-4 4 0 2.2 1.8 4 4 4h2v-2H8c-1.1 0-2-.9-2-2s.9-2 2-2h8c2.2 0 4-1.8 4-4V12.5c0-1.8-.2-3.3-2.3-4.3C20.2 7.2 18.2 7 16 7zm-3 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3 14c2.2 0 4.2-.2 5.7-1.2 1.9-1 2.3-2.5 2.3-4.3V17h-8v-2h8c2.2 0 4-1.8 4-4 0-2.2-1.8-4-4-4h-2v2h2c1.1 0 2 .9 2 2s-.9 2-2 2h-8c-2.2 0-4 1.8-4 4v2.5c0 1.8.2 3.3 2.3 4.3C11.8 24.8 13.8 25 16 25zm3-2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#FFD43B"/></svg>
    ),
    description: "Python is known for its readability and versatility, widely used in data science, AI, and web development.",
    learnMore: "https://docs.python.org/3/",
    examples: "https://github.com/topics/python",
    accent: "border-blue-500",
    circle: "bg-blue-500/90"
  },
  {
    name: "TypeScript",
    icon: (
      // TypeScript logo
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#3178C6"/><path d="M10 13h12v2H10v-2zm0 4h8v2h-8v-2z" fill="#fff"/><text x="13" y="24" fontSize="10" fontWeight="bold" fill="#fff">TS</text></svg>
    ),
    description: "TypeScript adds static typing to JavaScript, making large codebases more robust and maintainable.",
    learnMore: "https://www.typescriptlang.org/docs/",
    examples: "https://github.com/topics/typescript",
    accent: "border-blue-400",
    circle: "bg-blue-400/90"
  },
  {
    name: "Go",
    icon: (
      // Go gopher face (simplified)
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#00ADD8"/><ellipse cx="12" cy="16" rx="3" ry="4" fill="#fff"/><ellipse cx="20" cy="16" rx="3" ry="4" fill="#fff"/><circle cx="13" cy="17" r="1" fill="#222"/><circle cx="19" cy="17" r="1" fill="#222"/><ellipse cx="16" cy="22" rx="2" ry="1" fill="#222"/></svg>
    ),
    description: "Go is designed for simplicity and performance, ideal for cloud services and scalable systems.",
    learnMore: "https://go.dev/doc/",
    examples: "https://github.com/topics/go",
    accent: "border-cyan-400",
    circle: "bg-cyan-400/90"
  },
  {
    name: "Rust",
    icon: (
      // Rust gear (simplified)
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#dea584"/><circle cx="16" cy="16" r="8" fill="#222"/><text x="10" y="21" fontSize="10" fontWeight="bold" fill="#dea584">R</text></svg>
    ),
    description: "Rust is loved for its memory safety and speed, powering everything from web servers to embedded devices.",
    learnMore: "https://doc.rust-lang.org/",
    examples: "https://github.com/topics/rust",
    accent: "border-orange-300",
    circle: "bg-orange-300/90"
  },
  {
    name: "Java",
    icon: (
      // Java coffee cup (simplified)
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#f89820"/><path d="M16 22c-3 0-5-2-5-4h10c0 2-2 4-5 4z" fill="#fff"/><path d="M16 10c1 1 0 2-1 3s-1 2 1 3" stroke="#fff" strokeWidth="1.2" fill="none"/><ellipse cx="16" cy="24" rx="4" ry="1.2" fill="#fff" opacity=".5"/></svg>
    ),
    description: "Java is a versatile, object-oriented language widely used for enterprise, Android, and backend development.",
    learnMore: "https://docs.oracle.com/en/java/",
    examples: "https://github.com/topics/java",
    accent: "border-orange-500",
    circle: "bg-orange-500/90"
  },
  {
    name: "C#",
    icon: (
      // C# logo (simplified)
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#68217A"/><text x="10" y="22" fontSize="14" fontWeight="bold" fill="#fff">C#</text></svg>
    ),
    description: "C# is a modern, multi-paradigm language popular for Windows apps, games (Unity), and enterprise software.",
    learnMore: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    examples: "https://github.com/topics/csharp",
    accent: "border-purple-700",
    circle: "bg-purple-700/90"
  },
  {
    name: "C++",
    icon: (
      // C++ logo (simplified)
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#00599C"/><text x="8" y="22" fontSize="14" fontWeight="bold" fill="#fff">C++</text></svg>
    ),
    description: "C++ is a powerful language for high-performance applications, game engines, and system software.",
    learnMore: "https://isocpp.org/get-started",
    examples: "https://github.com/topics/cpp",
    accent: "border-blue-800",
    circle: "bg-blue-800/90"
  },
  {
    name: "PHP",
    icon: (
      // PHP logo (simplified)
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#777BB4"/><ellipse cx="16" cy="16" rx="10" ry="6" fill="#fff"/><text x="9" y="20" fontSize="10" fontWeight="bold" fill="#777BB4">PHP</text></svg>
    ),
    description: "PHP is a popular scripting language especially suited for web development and server-side scripting.",
    learnMore: "https://www.php.net/docs.php",
    examples: "https://github.com/topics/php",
    accent: "border-indigo-400",
    circle: "bg-indigo-400/90"
  },
  {
    name: "Swift",
    icon: (
      // Swift bird (simplified)
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#FA7343"/><path d="M10 18c2 2 6 2 10-2-2-1-4-3-6-6 1 3 0 5-4 8z" fill="#fff"/></svg>
    ),
    description: "Swift is Apple’s modern language for iOS, macOS, and server-side development, known for safety and speed.",
    learnMore: "https://swift.org/documentation/",
    examples: "https://github.com/topics/swift",
    accent: "border-orange-400",
    circle: "bg-orange-400/90"
  },
  {
    name: "Kotlin",
    icon: (
      // Kotlin K (simplified)
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#7F52FF"/><polygon points="8,24 24,8 24,24" fill="#fff"/></svg>
    ),
    description: "Kotlin is a concise, expressive language for Android, web, and server-side development.",
    learnMore: "https://kotlinlang.org/docs/home.html",
    examples: "https://github.com/topics/kotlin",
    accent: "border-purple-400",
    circle: "bg-purple-400/90"
  },
  {
    name: "Ruby",
    icon: (
      // Ruby gem (simplified)
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#CC342D"/><polygon points="16,8 8,16 16,24 24,16" fill="#fff"/></svg>
    ),
    description: "Ruby is a dynamic, open-source language focused on simplicity and productivity, famous for Rails.",
    learnMore: "https://www.ruby-lang.org/en/documentation/",
    examples: "https://github.com/topics/ruby",
    accent: "border-red-500",
    circle: "bg-red-500/90"
  },
  {
    name: "Dart",
    icon: (
      // Dart logo (simplified)
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" fill="none"><rect width="32" height="32" rx="8" fill="#0175C2"/><polygon points="8,24 24,8 24,24" fill="#fff"/></svg>
    ),
    description: "Dart is optimized for building fast, multi-platform apps, and is the language behind Flutter.",
    learnMore: "https://dart.dev/guides",
    examples: "https://github.com/topics/dart",
    accent: "border-cyan-700",
    circle: "bg-cyan-700/90"
  },
];

const TrendingLanguages = () => (
  <section aria-labelledby="trending-languages-heading" className="py-8">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="mb-12 text-center">
        <h2 id="trending-languages-heading" className="text-4xl md:text-5xl font-extrabold text-primary dark:text-white mb-4 drop-shadow-lg tracking-tight">
          Trending Programming Languages
        </h2>
        <p className="text-lg md:text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto font-medium">
          Explore the most popular languages powering today’s technology. Click to learn or see real code in action.
        </p>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {languages.map((lang) => (
          <article
            key={lang.name}
            className={`relative flex flex-col items-center bg-white dark:bg-gray-900 rounded-2xl border-l-8 ${lang.accent} shadow-lg px-6 py-8 h-full transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary ${{
              'JavaScript': 'hover:bg-yellow-50 dark:hover:bg-yellow-900/30',
              'Python': 'hover:bg-blue-50 dark:hover:bg-blue-900/30',
              'TypeScript': 'hover:bg-blue-50 dark:hover:bg-blue-900/30',
              'Go': 'hover:bg-cyan-50 dark:hover:bg-cyan-900/30',
              'Rust': 'hover:bg-orange-50 dark:hover:bg-orange-900/30',
            }[lang.name] || ''}`}
            tabIndex={0}
            aria-label={lang.name}
            role="region"
          >
            {/* Icon at the top */}
            <div className={`flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full shadow-lg ring-4 ring-white dark:ring-gray-900 ${lang.circle} mb-6 mt-2`}>
              {lang.icon}
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col items-center text-center w-full">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                {lang.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm font-medium min-h-[40px]">
                {lang.description}
              </p>
              <div className="flex gap-3 w-full mt-auto">
                <a
                  href={lang.learnMore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center justify-center gap-2 px-0 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold text-sm shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary hover:!text-white hover:scale-105 hover:shadow-lg"
                  aria-label={`Learn more about ${lang.name}`}
                >
                  <FaBookOpen className="text-lg transition-colors group-hover:text-white" aria-hidden="true" />
                  <span className="transition-colors group-hover:text-white">Learn</span>
                </a>
                <a
                  href={lang.examples}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 inline-flex items-center justify-center gap-2 px-0 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold text-sm shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary hover:bg-secondary hover:!text-white hover:scale-105 hover:shadow-lg"
                  aria-label={`See ${lang.name} code examples`}
                >
                  <FaCode className="text-lg transition-colors group-hover:text-white" aria-hidden="true" />
                  <span className="transition-colors group-hover:text-white">Code</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default TrendingLanguages; 