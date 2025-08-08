import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

interface UserProfile {
  name: string
  experience: 'complete-beginner' | 'some-coding' | 'career-change'
  interests: string[]
  goals: string[]
  timeCommitment: string
  preferredLearning: string[]
  background: string
}

interface RoadmapStep {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  type: 'theory' | 'practice' | 'project' | 'assessment'
  resources: {
    type: 'video' | 'article' | 'course' | 'practice' | 'project' | 'documentation' | 'youtube' | 'book' | 'tutorial'
    title: string
    url: string
    duration: string
    author?: string
    rating?: number
    description?: string
    free?: boolean
  }[]
  skills: string[]
  prerequisites: string[]
  isCompleted: boolean
  learningResources?: {
    youtubeChannels: {
      name: string
      url: string
      description: string
      subscribers: string
    }[]
    documentation: {
      name: string
      url: string
      description: string
    }[]
    books: {
      title: string
      author: string
      url?: string
      description: string
      free?: boolean
    }[]
    practiceWebsites: {
      name: string
      url: string
      description: string
      difficulty: string
    }[]
    communities: {
      name: string
      url: string
      description: string
      platform: string
    }[]
  }
}

interface LearningRoadmap {
  title: string
  description: string
  totalDuration: string
  difficulty: string
  steps: RoadmapStep[]
  milestones: {
    week: number
    title: string
    description: string
    skills: string[]
  }[]
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// AI-powered roadmap generation
async function generatePersonalizedRoadmap(userProfile: UserProfile): Promise<LearningRoadmap> {
  const primaryInterest = userProfile.interests[0] || 'Programming'
  const isFullTime = userProfile.timeCommitment.includes('Full-time') || userProfile.timeCommitment.includes('8+')
  const totalDuration = isFullTime ? '3-4 months' : '6-8 months'
  
  // Generate roadmap based on user's primary interest
  let roadmapSteps: RoadmapStep[] = []
  
  if (primaryInterest === 'Web Development') {
    roadmapSteps = [
      {
        id: '1',
        title: 'Web Development Fundamentals',
        description: 'Learn the basics of how the web works and essential concepts',
        duration: '1-2 weeks',
        difficulty: 'beginner',
        type: 'theory',
        resources: [
          {
            type: 'youtube',
            title: 'How the Web Works - Crash Course',
            url: 'https://www.youtube.com/watch?v=hJHvdBlSxug',
            duration: '2 hours',
            author: 'Traversy Media',
            rating: 4.8,
            free: true,
            description: 'Complete overview of web fundamentals'
          },
          {
            type: 'article',
            title: 'Web Development Roadmap 2024',
            url: 'https://roadmap.sh/frontend',
            duration: '1 hour',
            free: true,
            description: 'Interactive roadmap for web developers'
          },
          {
            type: 'course',
            title: 'HTML & CSS Full Course',
            url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
            duration: '10 hours',
            author: 'FreeCodeCamp',
            rating: 4.9,
            free: true,
            description: 'Complete HTML and CSS certification'
          },
          {
            type: 'youtube',
            title: 'HTML Crash Course For Absolute Beginners',
            url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
            duration: '1 hour',
            author: 'Traversy Media',
            rating: 4.7,
            free: true,
            description: 'Quick start guide to HTML'
          }
        ],
        skills: ['HTML', 'CSS', 'Web Concepts', 'Browser DevTools'],
        prerequisites: [],
        isCompleted: false,
        learningResources: {
          youtubeChannels: [
            {
              name: 'Traversy Media',
              url: 'https://www.youtube.com/@TraversyMedia',
              description: 'Web development tutorials and crash courses',
              subscribers: '2.1M'
            },
            {
              name: 'FreeCodeCamp',
              url: 'https://www.youtube.com/@freecodecamp',
              description: 'Free programming courses and tutorials',
              subscribers: '8.5M'
            },
            {
              name: 'The Net Ninja',
              url: 'https://www.youtube.com/@NetNinja',
              description: 'Web development tutorials for beginners',
              subscribers: '1.1M'
            },
            {
              name: 'Kevin Powell',
              url: 'https://www.youtube.com/@KevinPowell',
              description: 'CSS specialist with amazing tutorials',
              subscribers: '800K'
            }
          ],
          documentation: [
            {
              name: 'MDN Web Docs - HTML',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
              description: 'Official HTML documentation and guides'
            },
            {
              name: 'MDN Web Docs - CSS',
              url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
              description: 'Comprehensive CSS reference and tutorials'
            },
            {
              name: 'W3Schools',
              url: 'https://www.w3schools.com/',
              description: 'Beginner-friendly web development tutorials'
            }
          ],
          books: [
            {
              title: 'HTML and CSS: Design and Build Websites',
              author: 'Jon Duckett',
              description: 'Visual guide to HTML and CSS for beginners',
              free: false
            },
            {
              title: 'Learning Web Design',
              author: 'Jennifer Robbins',
              description: 'Comprehensive guide to modern web design',
              free: false
            }
          ],
          practiceWebsites: [
            {
              name: 'Codecademy - HTML & CSS',
              url: 'https://www.codecademy.com/learn/learn-html',
              description: 'Interactive HTML and CSS lessons',
              difficulty: 'Beginner'
            },
            {
              name: 'freeCodeCamp',
              url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
              description: 'Free certification course with projects',
              difficulty: 'Beginner to Intermediate'
            }
          ],
          communities: [
            {
              name: 'r/webdev',
              url: 'https://www.reddit.com/r/webdev/',
              description: 'Web development community on Reddit',
              platform: 'Reddit'
            },
            {
              name: 'Stack Overflow',
              url: 'https://stackoverflow.com/questions/tagged/html+css',
              description: 'Q&A for programming problems',
              platform: 'Stack Overflow'
            }
          ]
        }
      },
      {
        id: '2',
        title: 'HTML & CSS Mastery',
        description: 'Build solid foundation in HTML structure and CSS styling',
        duration: '2-3 weeks',
        difficulty: 'beginner',
        type: 'practice',
        resources: [
          {
            type: 'course',
            title: 'Responsive Web Design Certification',
            url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
            duration: '20 hours',
            author: 'FreeCodeCamp',
            rating: 4.9,
            free: true,
            description: 'Complete certification with 5 projects'
          },
          {
            type: 'practice',
            title: 'Flexbox Froggy - CSS Flexbox Game',
            url: 'https://flexboxfroggy.com/',
            duration: '2 hours',
            rating: 4.8,
            free: true,
            description: 'Learn CSS Flexbox through fun games'
          },
          {
            type: 'practice',
            title: 'CSS Grid Garden',
            url: 'https://cssgridgarden.com/',
            duration: '2 hours',
            rating: 4.7,
            free: true,
            description: 'Master CSS Grid with interactive games'
          },
          {
            type: 'youtube',
            title: 'CSS Grid Tutorial - Complete Guide',
            url: 'https://www.youtube.com/watch?v=jV8B24rSN5o',
            duration: '2 hours',
            author: 'Dev Ed',
            rating: 4.8,
            free: true,
            description: 'Comprehensive CSS Grid tutorial'
          },
          {
            type: 'youtube',
            title: 'Flexbox CSS In 20 Minutes',
            url: 'https://www.youtube.com/watch?v=JJSoEo8JSnc',
            duration: '20 minutes',
            author: 'Traversy Media',
            rating: 4.9,
            free: true,
            description: 'Quick and effective Flexbox tutorial'
          }
        ],
        skills: ['Semantic HTML', 'CSS Grid', 'Flexbox', 'Responsive Design'],
        prerequisites: ['Web Development Fundamentals'],
        isCompleted: false,
        learningResources: {
          youtubeChannels: [
            {
              name: 'Kevin Powell',
              url: 'https://www.youtube.com/@KevinPowell',
              description: 'CSS specialist with amazing layout tutorials',
              subscribers: '800K'
            },
            {
              name: 'Layout Land',
              url: 'https://www.youtube.com/@LayoutLand',
              description: 'CSS Grid and Flexbox tutorials by Jen Simmons',
              subscribers: '50K'
            },
            {
              name: 'Dev Ed',
              url: 'https://www.youtube.com/@DevEd',
              description: 'Modern web development tutorials',
              subscribers: '1.2M'
            }
          ],
          documentation: [
            {
              name: 'CSS Grid Complete Guide',
              url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
              description: 'Comprehensive CSS Grid reference'
            },
            {
              name: 'Flexbox Complete Guide',
              url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
              description: 'Complete guide to CSS Flexbox'
            },
            {
              name: 'MDN - Responsive Design',
              url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design',
              description: 'Official guide to responsive web design'
            }
          ],
          books: [
            {
              title: 'CSS: The Definitive Guide',
              author: 'Eric Meyer',
              description: 'Comprehensive CSS reference book',
              free: false
            },
            {
              title: 'CSS Secrets',
              author: 'Lea Verou',
              description: 'Advanced CSS techniques and tricks',
              free: false
            }
          ],
          practiceWebsites: [
            {
              name: 'CSS Battle',
              url: 'https://cssbattle.dev/',
              description: 'CSS coding challenges and competitions',
              difficulty: 'Intermediate'
            },
            {
              name: 'Frontend Mentor',
              url: 'https://www.frontendmentor.io/',
              description: 'Real-world HTML/CSS projects',
              difficulty: 'Beginner to Advanced'
            },
            {
              name: 'Codepen Challenges',
              url: 'https://codepen.io/challenges/',
              description: 'Weekly CSS and HTML challenges',
              difficulty: 'All levels'
            }
          ],
          communities: [
            {
              name: 'CSS-Tricks Community',
              url: 'https://css-tricks.com/',
              description: 'CSS tutorials, tips, and community',
              platform: 'Website'
            },
            {
              name: 'r/css',
              url: 'https://www.reddit.com/r/css/',
              description: 'CSS community on Reddit',
              platform: 'Reddit'
            }
          ]
        }
      },
      {
        id: '3',
        title: 'JavaScript Fundamentals',
        description: 'Learn programming logic and JavaScript basics',
        duration: '3-4 weeks',
        difficulty: 'beginner',
        type: 'practice',
        resources: [
          {
            type: 'course',
            title: 'JavaScript Algorithms and Data Structures',
            url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
            duration: '30 hours',
            author: 'FreeCodeCamp',
            rating: 4.8,
            free: true,
            description: 'Complete JavaScript certification with projects'
          },
          {
            type: 'practice',
            title: 'JavaScript30 - 30 Day Challenge',
            url: 'https://javascript30.com/',
            duration: '15 hours',
            author: 'Wes Bos',
            rating: 4.9,
            free: true,
            description: '30 projects in 30 days with vanilla JavaScript'
          },
          {
            type: 'youtube',
            title: 'JavaScript Crash Course For Beginners',
            url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
            duration: '3 hours',
            author: 'Traversy Media',
            rating: 4.8,
            free: true,
            description: 'Complete JavaScript fundamentals in one video'
          },
          {
            type: 'youtube',
            title: 'Modern JavaScript Tutorial',
            url: 'https://www.youtube.com/watch?v=iWOYAxlnaww',
            duration: '4 hours',
            author: 'Mosh Hamedani',
            rating: 4.7,
            free: true,
            description: 'Modern JavaScript ES6+ features and concepts'
          },
          {
            type: 'book',
            title: 'Eloquent JavaScript (Free Online)',
            url: 'https://eloquentjavascript.net/',
            duration: '40 hours',
            author: 'Marijn Haverbeke',
            rating: 4.6,
            free: true,
            description: 'Comprehensive JavaScript book available free online'
          }
        ],
        skills: ['Variables', 'Functions', 'DOM Manipulation', 'Event Handling', 'ES6+'],
        prerequisites: ['HTML & CSS Mastery'],
        isCompleted: false,
        learningResources: {
          youtubeChannels: [
            {
              name: 'JavaScript Mastery',
              url: 'https://www.youtube.com/@javascriptmastery',
              description: 'Modern JavaScript and React tutorials',
              subscribers: '1.5M'
            },
            {
              name: 'Coding with Mosh',
              url: 'https://www.youtube.com/@programmingwithmosh',
              description: 'Programming tutorials including JavaScript',
              subscribers: '3.2M'
            },
            {
              name: 'Fun Fun Function',
              url: 'https://www.youtube.com/@funfunfunction',
              description: 'Advanced JavaScript concepts explained simply',
              subscribers: '260K'
            },
            {
              name: 'Academind',
              url: 'https://www.youtube.com/@academind',
              description: 'Web development tutorials and courses',
              subscribers: '900K'
            }
          ],
          documentation: [
            {
              name: 'MDN JavaScript Guide',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
              description: 'Official JavaScript documentation and tutorials'
            },
            {
              name: 'JavaScript.info',
              url: 'https://javascript.info/',
              description: 'Modern JavaScript tutorial with examples'
            },
            {
              name: 'W3Schools JavaScript',
              url: 'https://www.w3schools.com/js/',
              description: 'Beginner-friendly JavaScript reference'
            }
          ],
          books: [
            {
              title: 'You Don\'t Know JS (Book Series)',
              author: 'Kyle Simpson',
              url: 'https://github.com/getify/You-Dont-Know-JS',
              description: 'Deep dive into JavaScript mechanics',
              free: true
            },
            {
              title: 'JavaScript: The Good Parts',
              author: 'Douglas Crockford',
              description: 'Essential JavaScript concepts and best practices',
              free: false
            },
            {
              title: 'Secrets of the JavaScript Ninja',
              author: 'John Resig',
              description: 'Advanced JavaScript techniques',
              free: false
            }
          ],
          practiceWebsites: [
            {
              name: 'Codewars',
              url: 'https://www.codewars.com/',
              description: 'JavaScript coding challenges and kata',
              difficulty: 'Beginner to Expert'
            },
            {
              name: 'LeetCode',
              url: 'https://leetcode.com/',
              description: 'Algorithm and data structure problems',
              difficulty: 'Intermediate to Advanced'
            },
            {
              name: 'HackerRank JavaScript',
              url: 'https://www.hackerrank.com/domains/javascript',
              description: 'JavaScript-specific coding challenges',
              difficulty: 'Beginner to Advanced'
            },
            {
              name: 'Exercism JavaScript Track',
              url: 'https://exercism.org/tracks/javascript',
              description: 'Mentored JavaScript exercises',
              difficulty: 'Beginner to Advanced'
            }
          ],
          communities: [
            {
              name: 'r/javascript',
              url: 'https://www.reddit.com/r/javascript/',
              description: 'JavaScript community discussions',
              platform: 'Reddit'
            },
            {
              name: 'JavaScript Weekly',
              url: 'https://javascriptweekly.com/',
              description: 'Weekly JavaScript newsletter',
              platform: 'Newsletter'
            },
            {
              name: 'Dev.to JavaScript',
              url: 'https://dev.to/t/javascript',
              description: 'JavaScript articles and discussions',
              platform: 'Dev.to'
            }
          ]
        }
      },
      {
        id: '4',
        title: 'Interactive Web Projects',
        description: 'Build dynamic websites with JavaScript',
        duration: '3-4 weeks',
        difficulty: 'intermediate',
        type: 'project',
        resources: [
          {
            type: 'youtube',
            title: 'Build a Todo List App - JavaScript Project',
            url: 'https://www.youtube.com/watch?v=Ttf3CEsEwMQ',
            duration: '2 hours',
            author: 'Dev Ed',
            rating: 4.7,
            free: true,
            description: 'Complete todo app with local storage'
          },
          {
            type: 'youtube',
            title: 'Weather App JavaScript Tutorial',
            url: 'https://www.youtube.com/watch?v=wPElVpR1rwA',
            duration: '3 hours',
            author: 'Tyler Potts',
            rating: 4.6,
            free: true,
            description: 'Weather app using OpenWeatherMap API'
          },
          {
            type: 'youtube',
            title: 'JavaScript Calculator Tutorial',
            url: 'https://www.youtube.com/watch?v=j59qQ7YWLxw',
            duration: '1.5 hours',
            author: 'Web Dev Simplified',
            rating: 4.8,
            free: true,
            description: 'Build a functional calculator with JavaScript'
          },
          {
            type: 'tutorial',
            title: '20 Web Projects With Vanilla JavaScript',
            url: 'https://www.udemy.com/course/web-projects-with-vanilla-javascript/',
            duration: '15 hours',
            author: 'Brad Traversy',
            rating: 4.7,
            free: false,
            description: '20 practical projects to build your portfolio'
          },
          {
            type: 'practice',
            title: 'Frontend Mentor Projects',
            url: 'https://www.frontendmentor.io/challenges',
            duration: 'Varies',
            rating: 4.5,
            free: true,
            description: 'Real-world projects with designs provided'
          }
        ],
        skills: ['API Integration', 'Local Storage', 'Form Validation', 'Project Structure'],
        prerequisites: ['JavaScript Fundamentals'],
        isCompleted: false,
        learningResources: {
          youtubeChannels: [
            {
              name: 'Web Dev Simplified',
              url: 'https://www.youtube.com/@WebDevSimplified',
              description: 'Simplified web development tutorials',
              subscribers: '1.2M'
            },
            {
              name: 'Florin Pop',
              url: 'https://www.youtube.com/@FlorinPop',
              description: '100+ JavaScript projects and tutorials',
              subscribers: '200K'
            },
            {
              name: 'Coding Nepal',
              url: 'https://www.youtube.com/@CodingNepal',
              description: 'Web development projects and tutorials',
              subscribers: '500K'
            }
          ],
          documentation: [
            {
              name: 'Fetch API Guide',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
              description: 'Learn to work with APIs in JavaScript'
            },
            {
              name: 'Local Storage Guide',
              url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage',
              description: 'Store data in the browser'
            },
            {
              name: 'Form Validation Guide',
              url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation',
              description: 'Client-side form validation techniques'
            }
          ],
          books: [
            {
              title: 'JavaScript Projects for Beginners',
              author: 'Various Authors',
              description: 'Collection of beginner-friendly JavaScript projects',
              free: false
            }
          ],
          practiceWebsites: [
            {
              name: 'Frontend Mentor',
              url: 'https://www.frontendmentor.io/',
              description: 'Real-world projects with professional designs',
              difficulty: 'Beginner to Advanced'
            },
            {
              name: 'DevChallenges',
              url: 'https://devchallenges.io/',
              description: 'Frontend and fullstack challenges',
              difficulty: 'Intermediate'
            },
            {
              name: 'Ace Frontend',
              url: 'https://www.acefrontend.com/',
              description: 'Frontend coding challenges',
              difficulty: 'Beginner to Advanced'
            }
          ],
          communities: [
            {
              name: 'Frontend Mentor Community',
              url: 'https://www.frontendmentor.io/community',
              description: 'Share projects and get feedback',
              platform: 'Frontend Mentor'
            },
            {
              name: 'r/webdev Projects',
              url: 'https://www.reddit.com/r/webdev/',
              description: 'Share and discuss web development projects',
              platform: 'Reddit'
            }
          ]
        }
      },
      {
        id: '5',
        title: 'Modern Frontend Framework - React',
        description: 'Master React.js for building modern user interfaces',
        duration: '4-6 weeks',
        difficulty: 'intermediate',
        type: 'practice',
        resources: [
          {
            type: 'course',
            title: 'React - The Complete Guide 2024',
            url: 'https://reactjs.org/tutorial/tutorial.html',
            duration: '40 hours',
            author: 'React Team',
            rating: 4.8,
            free: true,
            description: 'Official React tutorial and documentation'
          },
          {
            type: 'youtube',
            title: 'React Course - Beginner\'s Tutorial',
            url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
            duration: '5 hours',
            author: 'FreeCodeCamp',
            rating: 4.9,
            free: true,
            description: 'Complete React course for beginners'
          },
          {
            type: 'youtube',
            title: 'React Hooks Tutorial',
            url: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
            duration: '2 hours',
            author: 'Codevolution',
            rating: 4.7,
            free: true,
            description: 'Comprehensive guide to React Hooks'
          },
          {
            type: 'practice',
            title: 'React Scrimba Course',
            url: 'https://scrimba.com/learn/learnreact',
            duration: '15 hours',
            author: 'Bob Ziroll',
            rating: 4.8,
            free: true,
            description: 'Interactive React course with coding challenges'
          }
        ],
        skills: ['React Components', 'State Management', 'Props', 'Hooks', 'JSX'],
        prerequisites: ['Interactive Web Projects'],
        isCompleted: false,
        learningResources: {
          youtubeChannels: [
            {
              name: 'React',
              url: 'https://www.youtube.com/@reactjs',
              description: 'Official React channel with updates and tutorials',
              subscribers: '200K'
            },
            {
              name: 'Codevolution',
              url: 'https://www.youtube.com/@Codevolution',
              description: 'Detailed React and JavaScript tutorials',
              subscribers: '800K'
            },
            {
              name: 'Ben Awad',
              url: 'https://www.youtube.com/@BenAwad97',
              description: 'React, TypeScript, and web development',
              subscribers: '500K'
            }
          ],
          documentation: [
            {
              name: 'React Official Docs',
              url: 'https://react.dev/',
              description: 'Official React documentation and guides'
            },
            {
              name: 'React Patterns',
              url: 'https://reactpatterns.com/',
              description: 'Common React patterns and best practices'
            }
          ],
          books: [
            {
              title: 'Learning React',
              author: 'Alex Banks & Eve Porcello',
              description: 'Modern patterns for developing React apps',
              free: false
            },
            {
              title: 'React Quickly',
              author: 'Azat Mardan',
              description: 'Painless web apps with React, JSX, Redux, and GraphQL',
              free: false
            }
          ],
          practiceWebsites: [
            {
              name: 'React Challenges',
              url: 'https://react-challenges.vercel.app/',
              description: 'Practice React with coding challenges',
              difficulty: 'Beginner to Advanced'
            },
            {
              name: 'React CodePen Collection',
              url: 'https://codepen.io/collection/XQrgJo/',
              description: 'React examples and experiments',
              difficulty: 'All levels'
            }
          ],
          communities: [
            {
              name: 'Reactiflux Discord',
              url: 'https://www.reactiflux.com/',
              description: 'Large React community on Discord',
              platform: 'Discord'
            },
            {
              name: 'r/reactjs',
              url: 'https://www.reddit.com/r/reactjs/',
              description: 'React community on Reddit',
              platform: 'Reddit'
            }
          ]
        }
      },
      {
        id: '6',
        title: 'Backend Basics - Node.js & Express',
        description: 'Learn server-side development with Node.js and Express',
        duration: '4-5 weeks',
        difficulty: 'intermediate',
        type: 'practice',
        resources: [
          {
            type: 'youtube',
            title: 'Node.js Crash Course',
            url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
            duration: '3 hours',
            author: 'Traversy Media',
            rating: 4.8,
            free: true,
            description: 'Complete Node.js fundamentals'
          },
          {
            type: 'youtube',
            title: 'Express.js Crash Course',
            url: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
            duration: '2 hours',
            author: 'Traversy Media',
            rating: 4.7,
            free: true,
            description: 'Learn Express.js framework basics'
          },
          {
            type: 'course',
            title: 'Node.js, Express, MongoDB & More',
            url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
            duration: '25 hours',
            author: 'FreeCodeCamp',
            rating: 4.6,
            free: true,
            description: 'Complete backend development certification'
          },
          {
            type: 'youtube',
            title: 'Build a REST API with Node.js',
            url: 'https://www.youtube.com/watch?v=pKd0Rpw7O48',
            duration: '4 hours',
            author: 'Programming with Mosh',
            rating: 4.8,
            free: true,
            description: 'Complete REST API tutorial'
          },
          {
            type: 'project',
            title: 'MERN Stack Tutorial',
            url: 'https://www.youtube.com/watch?v=ngc9gnGgUdA',
            duration: '5 hours',
            author: 'Traversy Media',
            rating: 4.7,
            free: true,
            description: 'Full-stack MERN application tutorial'
          }
        ],
        skills: ['Node.js', 'Express.js', 'REST APIs', 'Database Integration', 'Authentication'],
        prerequisites: ['Modern Frontend Framework'],
        isCompleted: false,
        learningResources: {
          youtubeChannels: [
            {
              name: 'The Net Ninja',
              url: 'https://www.youtube.com/@NetNinja',
              description: 'Node.js and backend development tutorials',
              subscribers: '1.1M'
            },
            {
              name: 'Academind',
              url: 'https://www.youtube.com/@academind',
              description: 'Full-stack development courses',
              subscribers: '900K'
            },
            {
              name: 'Code with Antonio',
              url: 'https://www.youtube.com/@codewithantonio',
              description: 'Full-stack projects and tutorials',
              subscribers: '400K'
            }
          ],
          documentation: [
            {
              name: 'Node.js Official Docs',
              url: 'https://nodejs.org/en/docs/',
              description: 'Official Node.js documentation'
            },
            {
              name: 'Express.js Guide',
              url: 'https://expressjs.com/en/guide/routing.html',
              description: 'Official Express.js documentation'
            },
            {
              name: 'MongoDB University',
              url: 'https://university.mongodb.com/',
              description: 'Free MongoDB courses and certification'
            }
          ],
          books: [
            {
              title: 'Node.js Design Patterns',
              author: 'Mario Casciaro',
              description: 'Advanced Node.js patterns and best practices',
              free: false
            },
            {
              title: 'Express in Action',
              author: 'Evan Hahn',
              description: 'Writing, building, and testing Node.js applications',
              free: false
            }
          ],
          practiceWebsites: [
            {
              name: 'NodeSchool',
              url: 'https://nodeschool.io/',
              description: 'Interactive Node.js tutorials',
              difficulty: 'Beginner to Advanced'
            },
            {
              name: 'HackerRank Node.js',
              url: 'https://www.hackerrank.com/domains/javascript',
              description: 'Node.js coding challenges',
              difficulty: 'Intermediate'
            }
          ],
          communities: [
            {
              name: 'r/node',
              url: 'https://www.reddit.com/r/node/',
              description: 'Node.js community discussions',
              platform: 'Reddit'
            },
            {
              name: 'Node.js Discord',
              url: 'https://discord.gg/96WGtJt',
              description: 'Official Node.js community Discord',
              platform: 'Discord'
            }
          ]
        }
      }
    ]
  } else if (primaryInterest === 'Data Science') {
    roadmapSteps = [
      {
        id: '1',
        title: 'Python Programming Basics',
        description: 'Learn Python fundamentals for data science',
        duration: '2-3 weeks',
        difficulty: 'beginner',
        type: 'practice',
        resources: [
          {
            type: 'course',
            title: 'Python for Everybody Specialization',
            url: 'https://www.coursera.org/specializations/python',
            duration: '20 hours',
            author: 'University of Michigan',
            rating: 4.8,
            free: false,
            description: 'Complete Python course from basics to data structures'
          },
          {
            type: 'youtube',
            title: 'Python Full Course for Beginners',
            url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
            duration: '6 hours',
            author: 'Programming with Mosh',
            rating: 4.9,
            free: true,
            description: 'Complete Python tutorial for beginners'
          },
          {
            type: 'practice',
            title: 'Python Exercises on HackerRank',
            url: 'https://www.hackerrank.com/domains/python',
            duration: '10 hours',
            rating: 4.5,
            free: true,
            description: 'Python coding challenges and exercises'
          },
          {
            type: 'book',
            title: 'Automate the Boring Stuff with Python',
            url: 'https://automatetheboringstuff.com/',
            duration: '30 hours',
            author: 'Al Sweigart',
            rating: 4.7,
            free: true,
            description: 'Practical Python programming for beginners'
          }
        ],
        skills: ['Python Syntax', 'Data Types', 'Control Structures', 'Functions'],
        prerequisites: [],
        isCompleted: false,
        learningResources: {
          youtubeChannels: [
            {
              name: 'Corey Schafer',
              url: 'https://www.youtube.com/@coreyms',
              description: 'Excellent Python tutorials and best practices',
              subscribers: '1M'
            },
            {
              name: 'Real Python',
              url: 'https://www.youtube.com/@realpython',
              description: 'Python tutorials and tips',
              subscribers: '200K'
            },
            {
              name: 'Tech With Tim',
              url: 'https://www.youtube.com/@TechWithTim',
              description: 'Python programming and projects',
              subscribers: '1.2M'
            }
          ],
          documentation: [
            {
              name: 'Python Official Tutorial',
              url: 'https://docs.python.org/3/tutorial/',
              description: 'Official Python documentation and tutorial'
            },
            {
              name: 'Real Python Articles',
              url: 'https://realpython.com/',
              description: 'High-quality Python tutorials and articles'
            }
          ],
          books: [
            {
              title: 'Python Crash Course',
              author: 'Eric Matthes',
              description: 'Hands-on introduction to Python programming',
              free: false
            },
            {
              title: 'Think Python',
              author: 'Allen Downey',
              url: 'https://greenteapress.com/wp/think-python-2e/',
              description: 'How to think like a computer scientist',
              free: true
            }
          ],
          practiceWebsites: [
            {
              name: 'Python.org Beginner\'s Guide',
              url: 'https://wiki.python.org/moin/BeginnersGuide',
              description: 'Official beginner resources',
              difficulty: 'Beginner'
            },
            {
              name: 'Codecademy Python',
              url: 'https://www.codecademy.com/learn/learn-python-3',
              description: 'Interactive Python course',
              difficulty: 'Beginner'
            }
          ],
          communities: [
            {
              name: 'r/learnpython',
              url: 'https://www.reddit.com/r/learnpython/',
              description: 'Python learning community',
              platform: 'Reddit'
            },
            {
              name: 'Python Discord',
              url: 'https://pythondiscord.com/',
              description: 'Large Python community on Discord',
              platform: 'Discord'
            }
          ]
        }
      },
      {
        id: '2',
        title: 'Data Analysis Libraries',
        description: 'Master pandas, numpy, and matplotlib for data manipulation and visualization',
        duration: '3-4 weeks',
        difficulty: 'intermediate',
        type: 'practice',
        resources: [
          {
            type: 'course',
            title: 'Data Analysis with Python Certification',
            url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/',
            duration: '30 hours',
            author: 'FreeCodeCamp',
            rating: 4.7,
            free: true,
            description: 'Complete data analysis certification with projects'
          },
          {
            type: 'youtube',
            title: 'Pandas Tutorial Series',
            url: 'https://www.youtube.com/watch?v=ZyhVh-qRZPA',
            duration: '6 hours',
            author: 'Corey Schafer',
            rating: 4.9,
            free: true,
            description: 'Comprehensive pandas tutorial series'
          },
          {
            type: 'youtube',
            title: 'NumPy Tutorial for Beginners',
            url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI',
            duration: '1 hour',
            author: 'freeCodeCamp',
            rating: 4.6,
            free: true,
            description: 'Complete NumPy tutorial'
          },
          {
            type: 'youtube',
            title: 'Matplotlib Tutorial Series',
            url: 'https://www.youtube.com/watch?v=UO98lJQ3QGI',
            duration: '4 hours',
            author: 'Corey Schafer',
            rating: 4.8,
            free: true,
            description: 'Complete matplotlib visualization tutorial'
          }
        ],
        skills: ['Pandas', 'NumPy', 'Matplotlib', 'Data Cleaning', 'Data Visualization'],
        prerequisites: ['Python Programming Basics'],
        isCompleted: false,
        learningResources: {
          youtubeChannels: [
            {
              name: 'Data School',
              url: 'https://www.youtube.com/@dataschool',
              description: 'Pandas and data science tutorials',
              subscribers: '200K'
            },
            {
              name: 'Keith Galli',
              url: 'https://www.youtube.com/@KeithGalli',
              description: 'Data science and Python tutorials',
              subscribers: '300K'
            },
            {
              name: 'Sentdex',
              url: 'https://www.youtube.com/@sentdex',
              description: 'Python programming and data analysis',
              subscribers: '1.2M'
            }
          ],
          documentation: [
            {
              name: 'Pandas Documentation',
              url: 'https://pandas.pydata.org/docs/',
              description: 'Official pandas documentation and user guide'
            },
            {
              name: 'NumPy Documentation',
              url: 'https://numpy.org/doc/',
              description: 'Official NumPy documentation'
            },
            {
              name: 'Matplotlib Tutorials',
              url: 'https://matplotlib.org/stable/tutorials/index.html',
              description: 'Official matplotlib tutorials'
            }
          ],
          books: [
            {
              title: 'Python for Data Analysis',
              author: 'Wes McKinney',
              description: 'Data wrangling with pandas, NumPy, and IPython',
              free: false
            },
            {
              title: 'Hands-On Data Analysis with Pandas',
              author: 'Stefanie Molin',
              description: 'Efficiently perform data collection and analysis',
              free: false
            }
          ],
          practiceWebsites: [
            {
              name: 'Kaggle Learn',
              url: 'https://www.kaggle.com/learn/pandas',
              description: 'Free pandas micro-course',
              difficulty: 'Beginner to Intermediate'
            },
            {
              name: '100 Pandas Puzzles',
              url: 'https://github.com/ajcr/100-pandas-puzzles',
              description: 'Practice pandas with 100 puzzles',
              difficulty: 'Intermediate'
            }
          ],
          communities: [
            {
              name: 'r/datascience',
              url: 'https://www.reddit.com/r/datascience/',
              description: 'Data science community discussions',
              platform: 'Reddit'
            },
            {
              name: 'Kaggle Community',
              url: 'https://www.kaggle.com/discussions',
              description: 'Data science competitions and discussions',
              platform: 'Kaggle'
            }
          ]
        }
      },
      {
        id: '3',
        title: 'Statistics & Mathematics',
        description: 'Essential statistics for data science',
        duration: '3-4 weeks',
        difficulty: 'intermediate',
        type: 'theory',
        resources: [
          { type: 'course', title: 'Statistics for Data Science', url: '#', duration: '25 hours' },
          { type: 'practice', title: 'Statistical Analysis Projects', url: '#', duration: '10 hours' }
        ],
        skills: ['Descriptive Statistics', 'Probability', 'Hypothesis Testing', 'Correlation'],
        prerequisites: ['Data Analysis Libraries'],
        isCompleted: false
      }
    ]
  } else if (primaryInterest === 'Mobile Apps') {
    roadmapSteps = [
      {
        id: '1',
        title: 'Mobile Development Fundamentals',
        description: 'Understand mobile app development concepts',
        duration: '1-2 weeks',
        difficulty: 'beginner',
        type: 'theory',
        resources: [
          { type: 'video', title: 'Mobile App Development Overview', url: '#', duration: '3 hours' },
          { type: 'article', title: 'Native vs Cross-platform', url: '#', duration: '1 hour' }
        ],
        skills: ['Mobile Concepts', 'Platform Differences', 'Development Options'],
        prerequisites: [],
        isCompleted: false
      },
      {
        id: '2',
        title: 'React Native Basics',
        description: 'Learn cross-platform mobile development',
        duration: '4-5 weeks',
        difficulty: 'intermediate',
        type: 'practice',
        resources: [
          { type: 'course', title: 'React Native - The Practical Guide', url: '#', duration: '35 hours' },
          { type: 'project', title: 'First Mobile App', url: '#', duration: '15 hours' }
        ],
        skills: ['React Native', 'Mobile UI', 'Navigation', 'Device APIs'],
        prerequisites: ['Mobile Development Fundamentals'],
        isCompleted: false
      }
    ]
  } else {
    // Default programming roadmap
    roadmapSteps = [
      {
        id: '1',
        title: 'Programming Fundamentals',
        description: 'Learn basic programming concepts and logic',
        duration: '2-3 weeks',
        difficulty: 'beginner',
        type: 'theory',
        resources: [
          { type: 'video', title: 'Programming Basics Course', url: '#', duration: '10 hours' },
          { type: 'practice', title: 'Logic Building Exercises', url: '#', duration: '8 hours' }
        ],
        skills: ['Variables', 'Functions', 'Loops', 'Conditionals', 'Problem Solving'],
        prerequisites: [],
        isCompleted: false
      },
      {
        id: '2',
        title: 'Choose Your Language',
        description: 'Learn your first programming language thoroughly',
        duration: '4-5 weeks',
        difficulty: 'beginner',
        type: 'practice',
        resources: [
          { type: 'course', title: 'Python/JavaScript Fundamentals', url: '#', duration: '25 hours' },
          { type: 'practice', title: 'Coding Challenges', url: '#', duration: '15 hours' }
        ],
        skills: ['Language Syntax', 'Data Structures', 'Object-Oriented Programming'],
        prerequisites: ['Programming Fundamentals'],
        isCompleted: false
      }
    ]
  }

  // Generate milestones based on steps
  const milestones = [
    {
      week: 4,
      title: 'Foundation Complete',
      description: 'You\'ve mastered the basics and ready for intermediate concepts',
      skills: roadmapSteps.slice(0, 2).flatMap(step => step.skills.slice(0, 2))
    },
    {
      week: 8,
      title: 'Practical Skills',
      description: 'You can build basic projects and solve real problems',
      skills: roadmapSteps.slice(2, 4).flatMap(step => step.skills.slice(0, 2))
    },
    {
      week: 12,
      title: 'Advanced Concepts',
      description: 'You\'re ready for complex projects and advanced topics',
      skills: roadmapSteps.slice(4).flatMap(step => step.skills.slice(0, 2))
    }
  ]

  return {
    title: `${primaryInterest} Learning Path for ${userProfile.name}`,
    description: `Personalized ${primaryInterest.toLowerCase()} roadmap designed for ${userProfile.experience} level, focusing on ${userProfile.goals.slice(0, 2).join(' and ')}`,
    totalDuration,
    difficulty: userProfile.experience === 'complete-beginner' ? 'Beginner-Friendly' : 'Progressive',
    steps: roadmapSteps,
    milestones: milestones.slice(0, Math.ceil(roadmapSteps.length / 2))
  }
}

export async function POST(request: NextRequest) {
  try {
    const userProfile: UserProfile = await request.json()

    if (!userProfile.name || !userProfile.interests.length || !userProfile.goals.length) {
      return NextResponse.json(
        { error: 'Missing required profile information' },
        { status: 400 }
      )
    }

    console.log('Generating personalized roadmap for:', userProfile.name)

    const roadmap = await generatePersonalizedRoadmap(userProfile)

    return NextResponse.json({
      success: true,
      roadmap,
      generated_at: new Date().toISOString(),
      user_profile: {
        name: userProfile.name,
        experience: userProfile.experience,
        primary_interest: userProfile.interests[0],
        time_commitment: userProfile.timeCommitment
      }
    })

  } catch (error: any) {
    console.error('Error generating roadmap:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate roadmap',
        message: error.message || 'Internal server error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Roadmap Generator API',
    description: 'POST your user profile to generate a personalized learning roadmap',
    required_fields: [
      'name',
      'experience',
      'interests',
      'goals',
      'timeCommitment',
      'preferredLearning'
    ],
    supported_interests: [
      'Web Development',
      'Mobile Apps', 
      'Data Science',
      'AI/Machine Learning',
      'Game Development',
      'Desktop Applications',
      'DevOps',
      'Cybersecurity'
    ]
  })
}
