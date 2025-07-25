import { FaYoutube, FaExternalLinkAlt, FaReact, FaCss3Alt, FaPython, FaVuejs, FaBootstrap, FaNodeJs, FaJs, FaDatabase } from 'react-icons/fa';

const resources = [
  {
    name: 'React',
    description: 'A JavaScript library for building user interfaces.',
    libraryUrl: 'https://react.dev/',
    youtubeUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
    language: 'JavaScript',
    icon: <FaReact className="text-blue-500 w-10 h-10" />, // logo
    isNew: true,
    category: 'Frontend',
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapid UI development.',
    libraryUrl: 'https://tailwindcss.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=pfaSUYaSgRo',
    language: 'CSS',
    icon: <FaCss3Alt className="text-cyan-500 w-10 h-10" />, // logo
    isNew: true,
    category: 'UI',
  },
  {
    name: 'Django',
    description: 'A high-level Python web framework.',
    libraryUrl: 'https://www.djangoproject.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=F5mRW0jo-U4',
    language: 'Python',
    icon: <FaPython className="text-yellow-500 w-10 h-10" />, // logo
    isNew: true,
    category: 'Backend',
  },
  {
    name: 'Vue.js',
    description: 'The Progressive JavaScript Framework.',
    libraryUrl: 'https://vuejs.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=YrxBCBibVo0',
    language: 'JavaScript',
    icon: <FaVuejs className="text-green-500 w-10 h-10" />, // logo
    category: 'Frontend',
  },
  {
    name: 'Bootstrap',
    description: 'The most popular HTML, CSS, and JS library in the world.',
    libraryUrl: 'https://getbootstrap.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=-qfEOE4vtxE',
    language: 'CSS',
    icon: <FaBootstrap className="text-purple-600 w-10 h-10" />, // logo
    category: 'UI',
  },
  {
    name: 'Flask',
    description: 'A lightweight WSGI web application framework.',
    libraryUrl: 'https://flask.palletsprojects.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA',
    language: 'Python',
    icon: <FaPython className="text-blue-400 w-10 h-10" />, // logo
    category: 'Backend',
  },
  {
    name: 'Next.js',
    description: 'The React Framework for Production.',
    libraryUrl: 'https://nextjs.org/',
    youtubeUrl: 'https://www.youtube.com/watch?v=1WmNXEVia8I',
    language: 'JavaScript',
    icon: <FaJs className="text-yellow-400 w-10 h-10" />, // logo
    category: 'Fullstack',
  },
  {
    name: 'Material-UI',
    description: 'React components for faster and easier web development.',
    libraryUrl: 'https://mui.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=vyJU9efvUtQ',
    language: 'JavaScript',
    icon: <FaReact className="text-blue-400 w-10 h-10" />, // logo
    category: 'UI',
  },
  {
    name: 'Express',
    description: 'Fast, unopinionated, minimalist web framework for Node.js.',
    libraryUrl: 'https://expressjs.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
    language: 'JavaScript',
    icon: <FaNodeJs className="text-green-600 w-10 h-10" />, // logo
    category: 'Backend',
  },
  {
    name: 'MongoDB',
    description: 'The most popular NoSQL database for modern apps.',
    libraryUrl: 'https://mongodb.com/',
    youtubeUrl: 'https://www.youtube.com/watch?v=ofme2o29ngU',
    language: 'Database',
    icon: <FaDatabase className="text-green-700 w-10 h-10" />, // logo
    category: 'Database',
  },
];

const borderColors: { [key: string]: string } = {
  'Frontend': 'border-blue-400',
  'UI': 'border-cyan-400',
  'Backend': 'border-green-400',
  'Fullstack': 'border-yellow-400',
  'Database': 'border-green-700',
};

export default function RecommendedResources() {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white text-center">Recommended Resources & Libraries</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto text-center text-lg">Explore top frameworks, UI libraries, and learning resources to supercharge your development journey.</p>
      </div>
      <div className="max-w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
        {resources.map((res, idx) => (
          <div
            key={res.name}
            className={`relative rounded-2xl p-5 border-2 min-h-[200px] ${borderColors[res.category] || 'border-primary'} shadow-lg transition-all flex flex-col h-full bg-gradient-to-br from-white/90 via-blue-50/70 to-gray-100/90 dark:from-gray-800/90 dark:via-gray-700/70 dark:to-gray-800/90 backdrop-blur-lg hover:scale-[1.02] hover:shadow-xl hover:border-opacity-90 border-opacity-70`}
            style={{ boxShadow: '0 6px 24px 0 rgba(31, 38, 135, 0.08)' }}
          >
            {/* Badge */}
            {res.isNew && (
              <span className="absolute top-4 right-4 bg-gradient-to-r from-pink-400 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">NEW</span>
            )}
            {/* Logo/Icon */}
            <div className="flex items-center justify-center mb-3">
              {res.icon}
            </div>
            {/* Title and YouTube */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{res.name}</h3>
              {res.youtubeUrl && (
                <a
                  href={res.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600 transition-colors"
                  title="Watch related YouTube project"
                >
                  <FaYoutube className="text-2xl drop-shadow" />
                </a>
              )}
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 mb-3" />
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-3 flex-1 text-sm leading-relaxed">{res.description}</p>
            {/* Category/Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full border border-opacity-30 ${borderColors[res.category] || 'border-primary'} bg-white/40 dark:bg-gray-900/30 text-gray-700 dark:text-gray-200`}>{res.category}</span>
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full border border-primary/20">
                {res.language}
              </span>
            </div>
            {/* Visit Button */}
            <a
              href={res.libraryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-3 py-2 rounded-lg shadow-md transition-all w-full justify-center text-sm border border-blue-500/20 hover:border-blue-700/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <FaExternalLinkAlt size={14} />
              Visit Resource
            </a>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}