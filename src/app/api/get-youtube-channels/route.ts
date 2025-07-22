import { NextResponse } from 'next/server'

// Curated list of popular programming YouTube channels organized by language
const programmingChannels = {
  'JavaScript': [
    {
      name: 'Traversy Media',
      url: 'https://www.youtube.com/@TraversyMedia',
      subscribers: '2.1M',
      description: 'Web development tutorials and courses',
      language: 'JavaScript'
    },
    {
      name: 'The Net Ninja',
      url: 'https://www.youtube.com/@NetNinja',
      subscribers: '1.2M',
      description: 'Modern web development tutorials',
      language: 'JavaScript'
    },
    {
      name: 'Programming with Mosh',
      url: 'https://www.youtube.com/@programmingwithmosh',
      subscribers: '3.4M',
      description: 'JavaScript and web development courses',
      language: 'JavaScript'
    },
    {
      name: 'JavaScript Mastery',
      url: 'https://www.youtube.com/@javascriptmastery',
      subscribers: '1.5M',
      description: 'Modern JavaScript, React, and full-stack projects',
      language: 'JavaScript'
    },
    {
      name: 'Coding Addict',
      url: 'https://www.youtube.com/@CodingAddict',
      subscribers: '800K',
      description: 'JavaScript fundamentals and practical projects',
      language: 'JavaScript'
    },
    {
      name: 'Kevin Powell',
      url: 'https://www.youtube.com/@KevinPowell',
      subscribers: '900K',
      description: 'CSS and JavaScript for front-end development',
      language: 'JavaScript'
    },
    {
      name: 'Florin Pop',
      url: 'https://www.youtube.com/@FlorinPop',
      subscribers: '200K',
      description: '100 Days of Code challenges and JavaScript projects',
      language: 'JavaScript'
    },
    {
      name: 'dcode',
      url: 'https://www.youtube.com/@dcode-software',
      subscribers: '400K',
      description: 'JavaScript tutorials and web development tips',
      language: 'JavaScript'
    },
    {
      name: 'Coding Train',
      url: 'https://www.youtube.com/@TheCodingTrain',
      subscribers: '1.6M',
      description: 'Creative coding with JavaScript and p5.js',
      language: 'JavaScript'
    },
    {
      name: 'Fun Fun Function',
      url: 'https://www.youtube.com/@funfunfunction',
      subscribers: '600K',
      description: 'Functional programming and JavaScript concepts',
      language: 'JavaScript'
    },
    {
      name: 'Wes Bos',
      url: 'https://www.youtube.com/@WesBos',
      subscribers: '400K',
      description: 'JavaScript, CSS, and web development courses',
      language: 'JavaScript'
    },
    {
      name: 'Clever Programmer',
      url: 'https://www.youtube.com/@CleverProgrammer',
      subscribers: '1.3M',
      description: 'JavaScript projects and coding bootcamp content',
      language: 'JavaScript'
    },
    {
      name: 'freeCodeCamp.org',
      url: 'https://www.youtube.com/@freecodecamp',
      subscribers: '8.1M',
      description: 'Full-length programming courses and tutorials for all levels',
      language: 'JavaScript'
    },
    {
      name: 'CodeWithHarry',
      url: 'https://www.youtube.com/@CodeWithHarry',
      subscribers: '4.5M',
      description: 'Programming tutorials in Hindi and English, including JavaScript',
      language: 'JavaScript'
    }
  ],
  'Python': [
    {
      name: 'Corey Schafer',
      url: 'https://www.youtube.com/@coreyms',
      subscribers: '1.1M',
      description: 'Python tutorials and programming concepts',
      language: 'Python'
    },
    {
      name: 'Tech With Tim',
      url: 'https://www.youtube.com/@TechWithTim',
      subscribers: '1.8M',
      description: 'Python programming tutorials and projects',
      language: 'Python'
    },
    {
      name: 'Programming with Mosh',
      url: 'https://www.youtube.com/@programmingwithmosh',
      subscribers: '3.4M',
      description: 'Python for beginners and advanced concepts',
      language: 'Python'
    },
    {
      name: 'freeCodeCamp.org',
      url: 'https://www.youtube.com/@freecodecamp',
      subscribers: '8.1M',
      description: 'Comprehensive Python courses and tutorials',
      language: 'Python'
    },
    {
      name: 'Sentdex',
      url: 'https://www.youtube.com/@sentdex',
      subscribers: '1.3M',
      description: 'Python programming, machine learning, and data science',
      language: 'Python'
    }
  ],
  'React': [
    {
      name: 'Academind',
      url: 'https://www.youtube.com/@academind',
      subscribers: '1.1M',
      description: 'React, JavaScript, and web development',
      language: 'React'
    },
    {
      name: 'Dev Ed',
      url: 'https://www.youtube.com/@developedbyed',
      subscribers: '1.2M',
      description: 'React tutorials and creative coding',
      language: 'React'
    },
    {
      name: 'Web Dev Simplified',
      url: 'https://www.youtube.com/@WebDevSimplified',
      subscribers: '1.4M',
      description: 'React and modern web development',
      language: 'React'
    },
    {
      name: 'freeCodeCamp.org',
      url: 'https://www.youtube.com/@freecodecamp',
      subscribers: '8.1M',
      description: 'React.js full courses and tutorials',
      language: 'React'
    }
  ],
  'Node.js': [
    {
      name: 'The Net Ninja',
      url: 'https://www.youtube.com/@NetNinja',
      subscribers: '1.2M',
      description: 'Node.js and backend development',
      language: 'Node.js'
    },
    {
      name: 'Traversy Media',
      url: 'https://www.youtube.com/@TraversyMedia',
      subscribers: '2.1M',
      description: 'Full-stack development with Node.js',
      language: 'Node.js'
    },
    {
      name: 'Academind',
      url: 'https://www.youtube.com/@academind',
      subscribers: '1.1M',
      description: 'Node.js and backend development tutorials',
      language: 'Node.js'
    }
  ],
  'TypeScript': [
    {
      name: 'Fireship',
      url: 'https://www.youtube.com/@Fireship',
      subscribers: '2.3M',
      description: 'TypeScript and modern development',
      language: 'TypeScript'
    },
    {
      name: 'Ben Awad',
      url: 'https://www.youtube.com/@bawad',
      subscribers: '1.1M',
      description: 'TypeScript and React development',
      language: 'TypeScript'
    },
    {
      name: 'freeCodeCamp.org',
      url: 'https://www.youtube.com/@freecodecamp',
      subscribers: '8.1M',
      description: 'TypeScript crash courses and tutorials',
      language: 'TypeScript'
    }
  ],
  'Java': [
    {
      name: 'Programming with Mosh',
      url: 'https://www.youtube.com/@programmingwithmosh',
      subscribers: '3.4M',
      description: 'Java programming tutorials',
      language: 'Java'
    },
    {
      name: 'Amigoscode',
      url: 'https://www.youtube.com/@amigoscode',
      subscribers: '1.1M',
      description: 'Java, Spring Boot, and backend development',
      language: 'Java'
    },
    {
      name: 'freeCodeCamp.org',
      url: 'https://www.youtube.com/@freecodecamp',
      subscribers: '8.1M',
      description: 'Java programming tutorials and courses',
      language: 'Java'
    }
  ],
  'C++': [
    {
      name: 'The Cherno',
      url: 'https://www.youtube.com/@TheCherno',
      subscribers: '1.1M',
      description: 'C++ programming and game development',
      language: 'C++'
    },
    {
      name: 'Programming with Mosh',
      url: 'https://www.youtube.com/@programmingwithmosh',
      subscribers: '3.4M',
      description: 'C++ tutorials and concepts',
      language: 'C++'
    },
    {
      name: 'freeCodeCamp.org',
      url: 'https://www.youtube.com/@freecodecamp',
      subscribers: '8.1M',
      description: 'C++ programming tutorials and courses',
      language: 'C++'
    }
  ],
  'Go': [
    {
      name: 'Tech With Tim',
      url: 'https://www.youtube.com/@TechWithTim',
      subscribers: '1.8M',
      description: 'Go programming tutorials',
      language: 'Go'
    },
    {
      name: 'freeCodeCamp.org',
      url: 'https://www.youtube.com/@freecodecamp',
      subscribers: '8.1M',
      description: 'Go programming tutorials and courses',
      language: 'Go'
    }
  ],
  'Rust': [
    {
      name: 'No Boilerplate',
      url: 'https://www.youtube.com/@NoBoilerplate',
      subscribers: '200K',
      description: 'Rust programming tutorials',
      language: 'Rust'
    },
    {
      name: 'Let\'s Get Rusty',
      url: 'https://www.youtube.com/@letsgetrusty',
      subscribers: '100K',
      description: 'Rust programming tutorials and tips',
      language: 'Rust'
    }
  ],
  'PHP': [
    {
      name: 'Traversy Media',
      url: 'https://www.youtube.com/@TraversyMedia',
      subscribers: '2.1M',
      description: 'PHP and backend development',
      language: 'PHP'
    },
    {
      name: 'Codecourse',
      url: 'https://www.youtube.com/@Codecourse',
      subscribers: '400K',
      description: 'PHP and web development tutorials',
      language: 'PHP'
    }
  ],
  'Ruby': [
    {
      name: 'Programming with Mosh',
      url: 'https://www.youtube.com/@programmingwithmosh',
      subscribers: '3.4M',
      description: 'Ruby programming tutorials',
      language: 'Ruby'
    },
    {
      name: 'GoRails',
      url: 'https://www.youtube.com/@GoRails',
      subscribers: '60K',
      description: 'Ruby on Rails screencasts and tutorials',
      language: 'Ruby'
    }
  ]
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language')

    if (language && programmingChannels[language as keyof typeof programmingChannels]) {
      return NextResponse.json(programmingChannels[language as keyof typeof programmingChannels])
    }

    // Return all channels if no specific language is requested
    const allChannels = Object.values(programmingChannels).flat()
    return NextResponse.json(allChannels)

  } catch (error) {
    console.error('Error fetching YouTube channels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch YouTube channels' },
      { status: 500 }
    )
  }
} 