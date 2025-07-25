interface QuizQuestion {
  question: string
  options: { [key: string]: string }
  answer: string
  explanation: string
  codeSnippet?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
}

interface TopicQuizBank {
  [topic: string]: {
    [difficulty: string]: QuizQuestion[]
  }
}

export const quizBank: TopicQuizBank = {
  'Async/Await': {
    beginner: [
      {
        question: 'What is the main purpose of async/await in JavaScript?',
        options: {
          'A': 'To make code run faster',
          'B': 'To handle asynchronous operations more elegantly',
          'C': 'To create new variables',
          'D': 'To improve memory usage'
        },
        answer: 'B',
        explanation: 'Async/await provides a more elegant way to handle asynchronous operations compared to callbacks and promises.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which keyword is used to declare an async function?',
        options: {
          'A': 'await',
          'B': 'async',
          'C': 'promise',
          'D': 'then'
        },
        answer: 'B',
        explanation: 'The `async` keyword is used to declare an async function.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What does the await keyword do?',
        options: {
          'A': 'Pauses execution until a promise resolves',
          'B': 'Creates a new promise',
          'C': 'Throws an error',
          'D': 'Continues execution immediately'
        },
        answer: 'A',
        explanation: 'The await keyword pauses the execution of an async function until a promise is resolved.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Can you use await outside of an async function?',
        options: {
          'A': 'Yes, always',
          'B': 'No, never',
          'C': 'Only in top-level modules',
          'D': 'Only in Node.js'
        },
        answer: 'C',
        explanation: 'You can use await at the top level of modules, but not in regular functions.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What happens if you forget to await a promise in an async function?',
        options: {
          'A': 'The function returns the promise object',
          'B': 'An error is thrown',
          'C': 'The function returns undefined',
          'D': 'The function waits forever'
        },
        answer: 'A',
        explanation: 'If you forget to await, the function returns the promise object instead of the resolved value.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you handle errors in async/await?',
        options: {
          'A': 'Only with .catch()',
          'B': 'Only with try/catch',
          'C': 'With try/catch or .catch()',
          'D': 'Errors cannot be handled'
        },
        answer: 'C',
        explanation: 'You can handle errors in async/await using try/catch blocks or .catch() methods.',
        difficulty: 'beginner',
        category: 'best-practice'
      },
      {
        question: 'What is the return type of an async function?',
        options: {
          'A': 'Always undefined',
          'B': 'Always a Promise',
          'C': 'The actual return value',
          'D': 'Depends on the function'
        },
        answer: 'B',
        explanation: 'Async functions always return a Promise, even if you return a regular value.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which of these is correct async/await syntax?',
        options: {
          'A': 'async function getData() { return await fetch(url); }',
          'B': 'function async getData() { return await fetch(url); }',
          'C': 'async function getData() { return fetch(url); }',
          'D': 'function getData() { return async fetch(url); }'
        },
        answer: 'A',
        explanation: 'The correct syntax is `async function` followed by the function name.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the main advantage of async/await over .then()?',
        options: {
          'A': 'It runs faster',
          'B': 'It uses less memory',
          'C': 'It makes code more readable',
          'D': 'It supports more browsers'
        },
        answer: 'C',
        explanation: 'Async/await makes asynchronous code look more like synchronous code, improving readability.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Can you use async/await with setTimeout?',
        options: {
          'A': 'No, never',
          'B': 'Yes, directly',
          'C': 'Yes, by wrapping it in a Promise',
          'D': 'Only in Node.js'
        },
        answer: 'C',
        explanation: 'You can use async/await with setTimeout by wrapping it in a Promise.',
        difficulty: 'beginner',
        category: 'concept'
      }
    ],
    intermediate: [
      {
        question: 'What will this code output?\n\n```javascript\nasync function test() {\n  console.log(1);\n  await Promise.resolve(2);\n  console.log(3);\n}\ntest();\nconsole.log(4);\n```',
        options: {
          'A': '1, 2, 3, 4',
          'B': '1, 4, 2, 3',
          'C': '1, 4, 3',
          'D': '1, 2, 4, 3'
        },
        answer: 'C',
        explanation: 'The await pauses execution, so 4 is logged before 3.',
        codeSnippet: 'async function test() {\n  console.log(1);\n  await Promise.resolve(2);\n  console.log(3);\n}\ntest();\nconsole.log(4);',
        difficulty: 'intermediate',
        category: 'debugging'
      },
      {
        question: 'How do you run multiple async operations in parallel?',
        options: {
          'A': 'Use await for each operation',
          'B': 'Use Promise.all()',
          'C': 'Use async/await in a loop',
          'D': 'Use setTimeout()'
        },
        answer: 'B',
        explanation: 'Promise.all() allows you to run multiple async operations in parallel.',
        difficulty: 'intermediate',
        category: 'best-practice'
      },
      {
        question: 'What is the difference between Promise.all() and Promise.allSettled()?',
        options: {
          'A': 'There is no difference',
          'B': 'allSettled() waits for all promises to settle, all() fails if any promise fails',
          'C': 'all() is faster than allSettled()',
          'D': 'allSettled() only works with async/await'
        },
        answer: 'B',
        explanation: 'Promise.allSettled() waits for all promises to complete regardless of success/failure.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What will happen if an error is thrown in an async function?',
        options: {
          'A': 'The function stops executing',
          'B': 'The error is automatically caught',
          'C': 'The function returns a rejected promise',
          'D': 'The error is ignored'
        },
        answer: 'C',
        explanation: 'Errors in async functions are automatically wrapped in a rejected promise.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you create a delay function using async/await?',
        options: {
          'A': 'async function delay(ms) { return setTimeout(ms); }',
          'B': 'async function delay(ms) { await new Promise(resolve => setTimeout(resolve, ms)); }',
          'C': 'function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }',
          'D': 'async function delay(ms) { return Promise.resolve(setTimeout(ms)); }'
        },
        answer: 'C',
        explanation: 'The correct way is to return a Promise that resolves after the timeout.',
        difficulty: 'intermediate',
        category: 'best-practice'
      },
      {
        question: 'What is the purpose of Promise.race()?',
        options: {
          'A': 'To run promises in sequence',
          'B': 'To return the first promise that settles',
          'C': 'To combine multiple promises',
          'D': 'To handle errors in promises'
        },
        answer: 'B',
        explanation: 'Promise.race() returns the first promise that settles (resolves or rejects).',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you handle multiple async operations where you need the first successful result?',
        options: {
          'A': 'Use Promise.all()',
          'B': 'Use Promise.any()',
          'C': 'Use async/await in a loop',
          'D': 'Use Promise.allSettled()'
        },
        answer: 'B',
        explanation: 'Promise.any() returns the first promise that resolves successfully.',
        difficulty: 'intermediate',
        category: 'best-practice'
      },
      {
        question: 'What is the difference between async/await and generators?',
        options: {
          'A': 'There is no difference',
          'B': 'Generators are more powerful but more complex',
          'C': 'Async/await is built on top of generators',
          'D': 'Generators are deprecated'
        },
        answer: 'C',
        explanation: 'Async/await is syntactic sugar built on top of generators and promises.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you cancel an async operation?',
        options: {
          'A': 'Use the cancel keyword',
          'B': 'Use AbortController',
          'C': 'Use clearTimeout',
          'D': 'Async operations cannot be cancelled'
        },
        answer: 'B',
        explanation: 'AbortController can be used to cancel fetch requests and other async operations.',
        difficulty: 'intermediate',
        category: 'best-practice'
      },
      {
        question: 'What is the purpose of Promise.finally()?',
        options: {
          'A': 'To handle only successful promises',
          'B': 'To handle only failed promises',
          'C': 'To execute code regardless of success or failure',
          'D': 'To chain multiple promises'
        },
        answer: 'C',
        explanation: 'Promise.finally() executes code regardless of whether the promise resolves or rejects.',
        difficulty: 'intermediate',
        category: 'concept'
      }
    ],
    advanced: [
      {
        question: 'How do you implement a retry mechanism with async/await?',
        options: {
          'A': 'Use a for loop with await',
          'B': 'Use Promise.retry()',
          'C': 'Use a recursive function with try/catch',
          'D': 'Use setTimeout()'
        },
        answer: 'C',
        explanation: 'A recursive function with try/catch is the most flexible way to implement retry logic.',
        difficulty: 'advanced',
        category: 'best-practice'
      },
      {
        question: 'What is the difference between microtasks and macrotasks in async/await?',
        options: {
          'A': 'There is no difference',
          'B': 'Microtasks are processed before macrotasks',
          'C': 'Macrotasks are faster than microtasks',
          'D': 'Only microtasks can use async/await'
        },
        answer: 'B',
        explanation: 'Microtasks (like promises) are processed before macrotasks (like setTimeout) in the event loop.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'How do you implement a timeout for async operations?',
        options: {
          'A': 'Use Promise.timeout()',
          'B': 'Use Promise.race() with a timeout promise',
          'C': 'Use setTimeout()',
          'D': 'Use async/await with a timer'
        },
        answer: 'B',
        explanation: 'Promise.race() with a timeout promise is the standard way to implement timeouts.',
        difficulty: 'advanced',
        category: 'best-practice'
      },
      {
        question: 'What is the purpose of async iterators?',
        options: {
          'A': 'To iterate over arrays faster',
          'B': 'To handle async operations in loops',
          'C': 'To create infinite loops',
          'D': 'To replace forEach()'
        },
        answer: 'B',
        explanation: 'Async iterators allow you to use for-await-of loops with async operations.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'How do you implement a semaphore pattern with async/await?',
        options: {
          'A': 'Use Promise.all()',
          'B': 'Use a counter with async/await',
          'C': 'Use Promise.race()',
          'D': 'Use setTimeout()'
        },
        answer: 'B',
        explanation: 'A semaphore can be implemented using a counter and async/await to limit concurrent operations.',
        difficulty: 'advanced',
        category: 'best-practice'
      }
    ]
  },
  'React Hooks': {
    beginner: [
      {
        question: 'What is the main purpose of React Hooks?',
        options: {
          'A': 'To make components faster',
          'B': 'To use state and lifecycle features in functional components',
          'C': 'To replace class components entirely',
          'D': 'To improve memory usage'
        },
        answer: 'B',
        explanation: 'Hooks allow functional components to use state and lifecycle features previously only available in class components.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which hook is used to add state to a functional component?',
        options: {
          'A': 'useEffect',
          'B': 'useState',
          'C': 'useContext',
          'D': 'useReducer'
        },
        answer: 'B',
        explanation: 'useState is the hook used to add state to functional components.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the correct way to call useState?',
        options: {
          'A': 'useState = [value, setValue]',
          'B': 'const [value, setValue] = useState(initialValue)',
          'C': 'useState(initialValue)',
          'D': 'const value = useState(initialValue)'
        },
        answer: 'B',
        explanation: 'useState returns an array with the current state and a function to update it.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What does useEffect do?',
        options: {
          'A': 'Creates a new component',
          'B': 'Handles side effects in functional components',
          'C': 'Updates the DOM directly',
          'D': 'Manages routing'
        },
        answer: 'B',
        explanation: 'useEffect handles side effects like data fetching, subscriptions, or manual DOM manipulations.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'When does useEffect run by default?',
        options: {
          'A': 'Only on mount',
          'B': 'After every render',
          'C': 'Only on unmount',
          'D': 'Never'
        },
        answer: 'B',
        explanation: 'useEffect runs after every render by default, similar to componentDidUpdate.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you make useEffect run only once on mount?',
        options: {
          'A': 'Pass an empty array as the second argument',
          'B': 'Pass null as the second argument',
          'C': 'Don\'t pass a second argument',
          'D': 'Pass true as the second argument'
        },
        answer: 'A',
        explanation: 'Passing an empty array [] as the second argument makes useEffect run only on mount.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the purpose of the cleanup function in useEffect?',
        options: {
          'A': 'To clean up the component',
          'B': 'To prevent memory leaks',
          'C': 'To reset the state',
          'D': 'To update the DOM'
        },
        answer: 'B',
        explanation: 'The cleanup function prevents memory leaks by cleaning up subscriptions, timers, etc.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which hook is used to share state between components?',
        options: {
          'A': 'useState',
          'B': 'useContext',
          'C': 'useEffect',
          'D': 'useReducer'
        },
        answer: 'B',
        explanation: 'useContext allows you to share state between components without prop drilling.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is the difference between useState and useReducer?',
        options: {
          'A': 'There is no difference',
          'B': 'useReducer is for complex state logic',
          'C': 'useState is faster',
          'D': 'useReducer is deprecated'
        },
        answer: 'B',
        explanation: 'useReducer is preferred for complex state logic that involves multiple sub-values.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Can you use hooks inside loops or conditions?',
        options: {
          'A': 'Yes, always',
          'B': 'No, never',
          'C': 'Only in certain cases',
          'D': 'Only with useEffect'
        },
        answer: 'B',
        explanation: 'Hooks must be called at the top level of your component, not inside loops, conditions, or nested functions.',
        difficulty: 'beginner',
        category: 'best-practice'
      }
    ],
    intermediate: [
      {
        question: 'What will this code output?\n\n```javascript\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    console.log(count);\n  }, [count]);\n  \n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}\n```',
        options: {
          'A': 'Logs 0, then 1, 2, 3... on each click',
          'B': 'Logs 0 only once',
          'C': 'Logs nothing',
          'D': 'Logs 0, then 1, 2, 3... but with delays'
        },
        answer: 'A',
        explanation: 'The useEffect runs after every render when count changes, logging the new value.',
        codeSnippet: 'function Counter() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    console.log(count);\n  }, [count]);\n  \n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}',
        difficulty: 'intermediate',
        category: 'debugging'
      },
      {
        question: 'How do you create a custom hook?',
        options: {
          'A': 'Use the useCustom keyword',
          'B': 'Create a function that starts with "use"',
          'C': 'Use React.createHook()',
          'D': 'Extend the Hook class'
        },
        answer: 'B',
        explanation: 'Custom hooks are functions that start with "use" and can call other hooks.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is the purpose of useMemo?',
        options: {
          'A': 'To memorize component names',
          'B': 'To optimize performance by memoizing expensive calculations',
          'C': 'To store data in memory',
          'D': 'To create memo components'
        },
        answer: 'B',
        explanation: 'useMemo memoizes expensive calculations to avoid recalculating on every render.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is the difference between useMemo and useCallback?',
        options: {
          'A': 'There is no difference',
          'B': 'useMemo memoizes values, useCallback memoizes functions',
          'C': 'useMemo is faster',
          'D': 'useCallback is deprecated'
        },
        answer: 'B',
        explanation: 'useMemo memoizes computed values, while useCallback memoizes functions.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you handle form state with hooks?',
        options: {
          'A': 'Use useState for each field',
          'B': 'Use useForm hook',
          'C': 'Use useReducer for complex forms',
          'D': 'All of the above'
        },
        answer: 'D',
        explanation: 'You can use useState for simple forms, useReducer for complex forms, or custom hooks.',
        difficulty: 'intermediate',
        category: 'best-practice'
      },
      {
        question: 'What is the purpose of useRef?',
        options: {
          'A': 'To reference other components',
          'B': 'To persist values between renders without causing re-renders',
          'C': 'To create refs to DOM elements',
          'D': 'B and C'
        },
        answer: 'D',
        explanation: 'useRef can be used to persist values and to create refs to DOM elements.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you implement a debounced search with hooks?',
        options: {
          'A': 'Use useDebounce hook',
          'B': 'Use useEffect with setTimeout',
          'C': 'Use useMemo',
          'D': 'Use useCallback'
        },
        answer: 'B',
        explanation: 'You can implement debouncing using useEffect with setTimeout and cleanup.',
        difficulty: 'intermediate',
        category: 'best-practice'
      },
      {
        question: 'What is the purpose of useLayoutEffect?',
        options: {
          'A': 'To run effects before paint',
          'B': 'To run effects after paint',
          'C': 'To replace useEffect',
          'D': 'To handle layout changes'
        },
        answer: 'A',
        explanation: 'useLayoutEffect runs synchronously after all DOM mutations, before the browser repaints.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you share state between sibling components?',
        options: {
          'A': 'Use useState in both components',
          'B': 'Lift state up to a common parent',
          'C': 'Use useContext',
          'D': 'B or C'
        },
        answer: 'D',
        explanation: 'You can lift state up to a common parent or use Context API.',
        difficulty: 'intermediate',
        category: 'best-practice'
      },
      {
        question: 'What is the purpose of useReducer?',
        options: {
          'A': 'To reduce component size',
          'B': 'To manage complex state logic',
          'C': 'To replace useState',
          'D': 'To optimize performance'
        },
        answer: 'B',
        explanation: 'useReducer is useful for managing complex state logic that involves multiple sub-values.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What does the useEffect hook do in React?',
        options: { A: 'Manages state', B: 'Performs side effects in function components', C: 'Creates context', D: 'Handles events' },
        answer: 'B',
        explanation: 'useEffect is used to perform side effects in function components, such as data fetching or subscriptions.',
        difficulty: 'intermediate',
        category: 'hooks'
      },
      {
        question: 'How do you pass data from a parent to a child component?',
        options: { A: 'Using state', B: 'Using props', C: 'Using context', D: 'Using refs' },
        answer: 'B',
        explanation: 'Props are used to pass data from parent to child components.',
        difficulty: 'intermediate',
        category: 'props'
      },
      {
        question: 'What is the purpose of the useContext hook?',
        options: { A: 'To manage local state', B: 'To access context values', C: 'To fetch data', D: 'To handle events' },
        answer: 'B',
        explanation: 'useContext allows you to access the value of a React context.',
        difficulty: 'intermediate',
        category: 'hooks'
      },
      {
        question: 'Which method is used to optimize performance by memoizing a component?',
        options: { A: 'React.memo', B: 'useMemo', C: 'useCallback', D: 'useReducer' },
        answer: 'A',
        explanation: 'React.memo is used to memoize a component to prevent unnecessary re-renders.',
        difficulty: 'intermediate',
        category: 'performance'
      },
      {
        question: 'What does the key prop do in a list of React elements?',
        options: { A: 'Sets the element ID', B: 'Helps React identify which items have changed', C: 'Adds a CSS class', D: 'Binds event handlers' },
        answer: 'B',
        explanation: 'The key prop helps React identify which items have changed, are added, or are removed.',
        difficulty: 'intermediate',
        category: 'lists'
      }
    ],
    advanced: [
      {
        question: 'What is React Fiber?',
        options: { A: 'A new rendering engine in React 16+', B: 'A CSS-in-JS library', C: 'A state management tool', D: 'A testing framework' },
        answer: 'A',
        explanation: 'React Fiber is the new reconciliation engine in React 16 and above, enabling incremental rendering.',
        difficulty: 'advanced',
        category: 'architecture'
      },
      {
        question: 'How can you implement code splitting in a React app?',
        options: { A: 'Using React.lazy and Suspense', B: 'Using useMemo', C: 'Using useEffect', D: 'Using useReducer' },
        answer: 'A',
        explanation: 'React.lazy and Suspense are used for code splitting and lazy loading components.',
        difficulty: 'advanced',
        category: 'performance'
      },
      {
        question: 'What is the purpose of useRef in React?',
        options: { A: 'To persist values across renders without causing re-renders', B: 'To manage state', C: 'To fetch data', D: 'To handle events' },
        answer: 'A',
        explanation: 'useRef returns a mutable ref object whose .current property persists for the full lifetime of the component.',
        difficulty: 'advanced',
        category: 'hooks'
      },
      {
        question: 'How do you prevent unnecessary re-renders in a React component?',
        options: { A: 'By using React.memo, useMemo, and useCallback', B: 'By using useEffect', C: 'By using useState', D: 'By using context' },
        answer: 'A',
        explanation: 'React.memo, useMemo, and useCallback help prevent unnecessary re-renders by memoizing components and functions.',
        difficulty: 'advanced',
        category: 'performance'
      },
      {
        question: 'What is the Context API used for in React?',
        options: { A: 'To share values between components without passing props', B: 'To manage local state', C: 'To handle events', D: 'To fetch data' },
        answer: 'A',
        explanation: 'The Context API allows you to share values between components without explicitly passing props through every level of the tree.',
        difficulty: 'advanced',
        category: 'context'
      }
    ]
  },
  'React': {
    beginner: [
      {
        question: 'What is React?',
        options: { A: 'A JavaScript library for building user interfaces', B: 'A CSS framework', C: 'A database', D: 'A backend language' },
        answer: 'A',
        explanation: 'React is a JavaScript library for building user interfaces.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which company developed React?',
        options: { A: 'Google', B: 'Facebook', C: 'Microsoft', D: 'Twitter' },
        answer: 'B',
        explanation: 'Facebook developed React.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a React component?',
        options: { A: 'A reusable piece of UI', B: 'A CSS class', C: 'A database table', D: 'A server' },
        answer: 'A',
        explanation: 'A component is a reusable piece of UI.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is JSX?',
        options: { A: 'A JavaScript extension for XML-like syntax', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'JSX is a JavaScript extension for XML-like syntax.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which hook is used for state in React?',
        options: { A: 'useState', B: 'useEffect', C: 'useContext', D: 'useReducer' },
        answer: 'A',
        explanation: 'useState is used for state in React.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you pass data to a child component?',
        options: { A: 'Using props', B: 'Using state', C: 'Using context', D: 'Using hooks' },
        answer: 'A',
        explanation: 'Props are used to pass data to child components.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is the default file extension for React components?',
        options: { A: '.jsx', B: '.js', C: '.react', D: '.component' },
        answer: 'A',
        explanation: 'React components often use the .jsx extension.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which method is used to render a React element?',
        options: { A: 'ReactDOM.render()', B: 'renderComponent()', C: 'createElement()', D: 'renderElement()' },
        answer: 'A',
        explanation: 'ReactDOM.render() is used to render a React element.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the virtual DOM?',
        options: { A: 'A lightweight copy of the real DOM', B: 'A database', C: 'A server', D: 'A CSS framework' },
        answer: 'A',
        explanation: 'The virtual DOM is a lightweight copy of the real DOM.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you handle events in React?',
        options: { A: 'Using camelCase event handlers', B: 'Using lowercase event handlers', C: 'Using HTML event handlers', D: 'Using CSS event handlers' },
        answer: 'A',
        explanation: 'React uses camelCase event handlers (e.g., onClick).',
        difficulty: 'beginner',
        category: 'syntax'
      }
    ],
    intermediate: [],
    advanced: []
  },
  'Vue': {
    beginner: [
      {
        question: 'What is Vue.js?',
        options: {
          'A': 'A JavaScript framework for building user interfaces',
          'B': 'A CSS library',
          'C': 'A database',
          'D': 'A backend language'
        },
        answer: 'A',
        explanation: 'Vue.js is a JavaScript framework for building user interfaces.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which directive is used for conditional rendering in Vue?',
        options: {
          'A': 'v-if',
          'B': 'v-for',
          'C': 'v-show',
          'D': 'v-bind'
        },
        answer: 'A',
        explanation: 'v-if is used for conditional rendering.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you bind an attribute in Vue?',
        options: {
          'A': 'v-bind:attr',
          'B': ':attr',
          'C': 'Both A and B',
          'D': 'v-attr'
        },
        answer: 'C',
        explanation: 'You can use v-bind:attr or :attr to bind attributes.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the root instance property in Vue?',
        options: {
          'A': 'el',
          'B': 'data',
          'C': 'methods',
          'D': 'template'
        },
        answer: 'A',
        explanation: 'el is the root instance property.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which lifecycle hook is called after the instance has been mounted?',
        options: {
          'A': 'created',
          'B': 'mounted',
          'C': 'updated',
          'D': 'destroyed'
        },
        answer: 'B',
        explanation: 'mounted is called after the instance is mounted.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you handle user input in Vue?',
        options: {
          'A': 'v-model',
          'B': 'v-input',
          'C': 'v-bind',
          'D': 'v-on'
        },
        answer: 'A',
        explanation: 'v-model is used for two-way data binding with user input.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which directive is used for looping through items in Vue?',
        options: {
          'A': 'v-for',
          'B': 'v-loop',
          'C': 'v-repeat',
          'D': 'v-each'
        },
        answer: 'A',
        explanation: 'v-for is used for looping through items.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you listen to events in Vue?',
        options: {
          'A': 'v-on:event',
          'B': '@event',
          'C': 'Both A and B',
          'D': 'v-event'
        },
        answer: 'C',
        explanation: 'You can use v-on:event or @event to listen to events.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the default file extension for Vue components?',
        options: {
          'A': '.vue',
          'B': '.js',
          'C': '.component',
          'D': '.vjs'
        },
        answer: 'A',
        explanation: 'Vue components use the .vue file extension.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which property is used to define component data in Vue?',
        options: {
          'A': 'data',
          'B': 'props',
          'C': 'methods',
          'D': 'computed'
        },
        answer: 'A',
        explanation: 'The data property is used to define component data.',
        difficulty: 'beginner',
        category: 'concept'
      }
    ],
    intermediate: [
      {
        question: 'Which directive is used for conditional rendering in Vue?',
        options: {
          'A': 'v-if',
          'B': 'v-for',
          'C': 'v-show',
          'D': 'v-bind'
        },
        answer: 'A',
        explanation: 'v-if is used for conditional rendering.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you bind an attribute in Vue?',
        options: {
          'A': 'v-bind:attr',
          'B': ':attr',
          'C': 'Both A and B',
          'D': 'v-attr'
        },
        answer: 'C',
        explanation: 'You can use v-bind:attr or :attr to bind attributes.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the root instance property in Vue?',
        options: {
          'A': 'el',
          'B': 'data',
          'C': 'methods',
          'D': 'template'
        },
        answer: 'A',
        explanation: 'el is the root instance property.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which lifecycle hook is called after the instance has been mounted?',
        options: {
          'A': 'created',
          'B': 'mounted',
          'C': 'updated',
          'D': 'destroyed'
        },
        answer: 'B',
        explanation: 'mounted is called after the instance is mounted.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you handle user input in Vue?',
        options: {
          'A': 'v-model',
          'B': 'v-input',
          'C': 'v-bind',
          'D': 'v-on'
        },
        answer: 'A',
        explanation: 'v-model is used for two-way data binding with user input.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which directive is used for looping through items in Vue?',
        options: {
          'A': 'v-for',
          'B': 'v-loop',
          'C': 'v-repeat',
          'D': 'v-each'
        },
        answer: 'A',
        explanation: 'v-for is used for looping through items.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you listen to events in Vue?',
        options: {
          'A': 'v-on:event',
          'B': '@event',
          'C': 'Both A and B',
          'D': 'v-event'
        },
        answer: 'C',
        explanation: 'You can use v-on:event or @event to listen to events.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the default file extension for Vue components?',
        options: {
          'A': '.vue',
          'B': '.js',
          'C': '.component',
          'D': '.vjs'
        },
        answer: 'A',
        explanation: 'Vue components use the .vue file extension.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which property is used to define component data in Vue?',
        options: {
          'A': 'data',
          'B': 'props',
          'C': 'methods',
          'D': 'computed'
        },
        answer: 'A',
        explanation: 'The data property is used to define component data.',
        difficulty: 'intermediate',
        category: 'concept'
      }
    ],
    advanced: [
      {
        question: 'Which directive is used for conditional rendering in Vue?',
        options: {
          'A': 'v-if',
          'B': 'v-for',
          'C': 'v-show',
          'D': 'v-bind'
        },
        answer: 'A',
        explanation: 'v-if is used for conditional rendering.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you bind an attribute in Vue?',
        options: {
          'A': 'v-bind:attr',
          'B': ':attr',
          'C': 'Both A and B',
          'D': 'v-attr'
        },
        answer: 'C',
        explanation: 'You can use v-bind:attr or :attr to bind attributes.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the root instance property in Vue?',
        options: {
          'A': 'el',
          'B': 'data',
          'C': 'methods',
          'D': 'template'
        },
        answer: 'A',
        explanation: 'el is the root instance property.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which lifecycle hook is called after the instance has been mounted?',
        options: {
          'A': 'created',
          'B': 'mounted',
          'C': 'updated',
          'D': 'destroyed'
        },
        answer: 'B',
        explanation: 'mounted is called after the instance is mounted.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'How do you handle user input in Vue?',
        options: {
          'A': 'v-model',
          'B': 'v-input',
          'C': 'v-bind',
          'D': 'v-on'
        },
        answer: 'A',
        explanation: 'v-model is used for two-way data binding with user input.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which directive is used for looping through items in Vue?',
        options: {
          'A': 'v-for',
          'B': 'v-loop',
          'C': 'v-repeat',
          'D': 'v-each'
        },
        answer: 'A',
        explanation: 'v-for is used for looping through items.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you listen to events in Vue?',
        options: {
          'A': 'v-on:event',
          'B': '@event',
          'C': 'Both A and B',
          'D': 'v-event'
        },
        answer: 'C',
        explanation: 'You can use v-on:event or @event to listen to events.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the default file extension for Vue components?',
        options: {
          'A': '.vue',
          'B': '.js',
          'C': '.component',
          'D': '.vjs'
        },
        answer: 'A',
        explanation: 'Vue components use the .vue file extension.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which property is used to define component data in Vue?',
        options: {
          'A': 'data',
          'B': 'props',
          'C': 'methods',
          'D': 'computed'
        },
        answer: 'A',
        explanation: 'The data property is used to define component data.',
        difficulty: 'advanced',
        category: 'concept'
      }
    ]
  },
  'JavaScript': {
    beginner: [
      {
        question: 'Which company developed JavaScript?',
        options: { A: 'Netscape', B: 'Microsoft', C: 'Google', D: 'Apple' },
        answer: 'A',
        explanation: 'Netscape developed JavaScript in 1995.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which symbol is used for single-line comments in JavaScript?',
        options: { A: '//', B: '<!--', C: '#', D: '/*' },
        answer: 'A',
        explanation: 'Single-line comments use // in JavaScript.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the output of: console.log(typeof null)?',
        options: { A: '"null"', B: '"object"', C: '"undefined"', D: '"number"' },
        answer: 'B',
        explanation: 'typeof null returns "object" due to a historical bug.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you declare a variable in JavaScript?',
        options: { A: 'var, let, or const', B: 'only var', C: 'only let', D: 'only const' },
        answer: 'A',
        explanation: 'JavaScript supports var, let, and const for variable declaration.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which of the following is NOT a JavaScript data type?',
        options: { A: 'Number', B: 'String', C: 'Boolean', D: 'Float' },
        answer: 'D',
        explanation: 'Float is not a JavaScript data type; Number covers all numbers.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you write a function in JavaScript?',
        options: { A: 'function myFunc() {}', B: 'def myFunc() {}', C: 'func myFunc() {}', D: 'function:myFunc() {}' },
        answer: 'A',
        explanation: 'function myFunc() {} is the correct syntax.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which operator is used to assign a value to a variable?',
        options: { A: '=', B: '==', C: '===', D: '=>' },
        answer: 'A',
        explanation: '= is the assignment operator.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you create an array in JavaScript?',
        options: { A: 'let arr = []', B: 'let arr = {}', C: 'let arr = ()', D: 'let arr = <>' },
        answer: 'A',
        explanation: '[] is used to create an array.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which method is used to add an element to the end of an array?',
        options: { A: 'push()', B: 'pop()', C: 'shift()', D: 'unshift()' },
        answer: 'A',
        explanation: 'push() adds an element to the end of an array.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What does the === operator do?',
        options: { A: 'Assigns a value', B: 'Compares value and type', C: 'Compares only value', D: 'Checks for null' },
        answer: 'B',
        explanation: '=== checks for both value and type equality.',
        difficulty: 'beginner',
        category: 'syntax'
      }
    ],
    intermediate: [
      {
        question: 'What is a closure in JavaScript?',
        options: { A: 'A function with access to its own scope, the outer function\'s scope, and the global scope', B: 'A function that closes the browser', C: 'A function that returns another function', D: 'A function that is immediately invoked' },
        answer: 'A',
        explanation: 'A closure is a function with access to its own scope, the outer function\'s scope, and the global scope.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which method is used to merge two arrays in JavaScript?',
        options: { A: 'concat()', B: 'merge()', C: 'append()', D: 'join()' },
        answer: 'A',
        explanation: 'concat() is used to merge arrays.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What does the "this" keyword refer to in a regular function (not arrow function)?',
        options: { A: 'The global object', B: 'The object that owns the function', C: 'The function itself', D: 'The parent object' },
        answer: 'B',
        explanation: 'In a regular function, "this" refers to the object that owns the function.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you create a promise in JavaScript?',
        options: { A: 'new Promise()', B: 'Promise.create()', C: 'promise()', D: 'Promise.new()' },
        answer: 'A',
        explanation: 'new Promise() creates a promise.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the output of [1,2,3].map(x => x * 2)?',
        options: { A: '[2,4,6]', B: '[1,2,3,2,4,6]', C: '[1,4,9]', D: '[2,3,4]' },
        answer: 'A',
        explanation: 'map() applies the function to each element.',
        difficulty: 'intermediate',
        category: 'syntax'
      }
    ],
    advanced: [
      {
        question: 'What is the purpose of the Symbol type in JavaScript?',
        options: { A: 'To create unique identifiers', B: 'To create symbols', C: 'To create objects', D: 'To create arrays' },
        answer: 'A',
        explanation: 'Symbol is used to create unique identifiers.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is the result of typeof NaN in JavaScript?',
        options: { A: 'number', B: 'NaN', C: 'undefined', D: 'object' },
        answer: 'A',
        explanation: 'typeof NaN is "number".',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'How do you make an object immutable in JavaScript?',
        options: { A: 'Object.freeze()', B: 'Object.seal()', C: 'const', D: 'Object.lock()' },
        answer: 'A',
        explanation: 'Object.freeze() makes an object immutable.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the difference between call, apply, and bind?',
        options: { A: 'They all set the "this" value, but bind returns a new function', B: 'They all do the same thing', C: 'Only call sets "this"', D: 'Only apply sets "this"' },
        answer: 'A',
        explanation: 'call and apply invoke the function, bind returns a new function.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is a generator function in JavaScript?',
        options: { A: 'A function that can pause and resume execution', B: 'A function that generates random numbers', C: 'A function that returns a promise', D: 'A function that is immediately invoked' },
        answer: 'A',
        explanation: 'A generator function can pause and resume execution using yield.',
        difficulty: 'advanced',
        category: 'concept'
      }
    ]
  },
  'TypeScript': {
    beginner: [
      {
        question: 'What is TypeScript?',
        options: { A: 'A superset of JavaScript', B: 'A CSS framework', C: 'A database', D: 'A backend language' },
        answer: 'A',
        explanation: 'TypeScript is a superset of JavaScript that adds static typing.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which file extension is used for TypeScript files?',
        options: { A: '.ts', B: '.js', C: '.tsx', D: '.jsx' },
        answer: 'A',
        explanation: 'TypeScript files use the .ts extension.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you declare a variable with a type in TypeScript?',
        options: { A: 'let x: number = 5;', B: 'let x = 5;', C: 'var x = 5;', D: 'x := 5;' },
        answer: 'A',
        explanation: 'let x: number = 5; declares a variable with a type.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define an interface in TypeScript?',
        options: { A: 'interface', B: 'type', C: 'class', D: 'struct' },
        answer: 'A',
        explanation: 'interface is used to define an interface.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you specify a function return type in TypeScript?',
        options: { A: 'function foo(): number {}', B: 'function foo() -> number {}', C: 'function foo() : number {}', D: 'function foo() returns number {}' },
        answer: 'A',
        explanation: 'function foo(): number {} specifies a return type.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which of the following is NOT a valid TypeScript type?',
        options: { A: 'string', B: 'number', C: 'boolean', D: 'real' },
        answer: 'D',
        explanation: 'real is not a valid TypeScript type.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you enable strict type checking in TypeScript?',
        options: { A: 'strict: true in tsconfig.json', B: 'use strict;', C: 'enableStrict()', D: 'setStrict(true)' },
        answer: 'A',
        explanation: 'strict: true in tsconfig.json enables strict type checking.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which keyword is used to define a type alias?',
        options: { A: 'type', B: 'alias', C: 'typedef', D: 'as' },
        answer: 'A',
        explanation: 'type is used to define a type alias.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you import a module in TypeScript?',
        options: { A: 'import ... from ...', B: 'require(...)', C: 'include ...', D: 'use ...' },
        answer: 'A',
        explanation: 'import ... from ... is the correct syntax.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What does the "readonly" modifier do in TypeScript?',
        options: { A: 'Makes a property immutable', B: 'Makes a property optional', C: 'Makes a property private', D: 'Makes a property public' },
        answer: 'A',
        explanation: 'readonly makes a property immutable.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which tool is used to compile TypeScript to JavaScript?',
        options: { A: 'tsc', B: 'babel', C: 'webpack', D: 'node' },
        answer: 'A',
        explanation: 'tsc is the TypeScript compiler.',
        difficulty: 'beginner',
        category: 'concept'
      }
    ],
    intermediate: [
      {
        question: 'What is TypeScript?',
        options: { A: 'A superset of JavaScript', B: 'A CSS framework', C: 'A database', D: 'A backend language' },
        answer: 'A',
        explanation: 'TypeScript is a superset of JavaScript that adds static typing.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which file extension is used for TypeScript files?',
        options: { A: '.ts', B: '.js', C: '.tsx', D: '.jsx' },
        answer: 'A',
        explanation: 'TypeScript files use the .ts extension.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you declare a variable with a type in TypeScript?',
        options: { A: 'let x: number = 5;', B: 'let x = 5;', C: 'var x = 5;', D: 'x := 5;' },
        answer: 'A',
        explanation: 'let x: number = 5; declares a variable with a type.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define an interface in TypeScript?',
        options: { A: 'interface', B: 'type', C: 'class', D: 'struct' },
        answer: 'A',
        explanation: 'interface is used to define an interface.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you specify a function return type in TypeScript?',
        options: { A: 'function foo(): number {}', B: 'function foo() -> number {}', C: 'function foo() : number {}', D: 'function foo() returns number {}' },
        answer: 'A',
        explanation: 'function foo(): number {} specifies a return type.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which of the following is NOT a valid TypeScript type?',
        options: { A: 'string', B: 'number', C: 'boolean', D: 'real' },
        answer: 'D',
        explanation: 'real is not a valid TypeScript type.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you enable strict type checking in TypeScript?',
        options: { A: 'strict: true in tsconfig.json', B: 'use strict;', C: 'enableStrict()', D: 'setStrict(true)' },
        answer: 'A',
        explanation: 'strict: true in tsconfig.json enables strict type checking.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which keyword is used to define a type alias?',
        options: { A: 'type', B: 'alias', C: 'typedef', D: 'as' },
        answer: 'A',
        explanation: 'type is used to define a type alias.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you import a module in TypeScript?',
        options: { A: 'import ... from ...', B: 'require(...)', C: 'include ...', D: 'use ...' },
        answer: 'A',
        explanation: 'import ... from ... is the correct syntax.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What does the "readonly" modifier do in TypeScript?',
        options: { A: 'Makes a property immutable', B: 'Makes a property optional', C: 'Makes a property private', D: 'Makes a property public' },
        answer: 'A',
        explanation: 'readonly makes a property immutable.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which tool is used to compile TypeScript to JavaScript?',
        options: { A: 'tsc', B: 'babel', C: 'webpack', D: 'node' },
        answer: 'A',
        explanation: 'tsc is the TypeScript compiler.',
        difficulty: 'intermediate',
        category: 'concept'
      }
    ],
    advanced: [
      {
        question: 'What is TypeScript?',
        options: { A: 'A superset of JavaScript', B: 'A CSS framework', C: 'A database', D: 'A backend language' },
        answer: 'A',
        explanation: 'TypeScript is a superset of JavaScript that adds static typing.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which file extension is used for TypeScript files?',
        options: { A: '.ts', B: '.js', C: '.tsx', D: '.jsx' },
        answer: 'A',
        explanation: 'TypeScript files use the .ts extension.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you declare a variable with a type in TypeScript?',
        options: { A: 'let x: number = 5;', B: 'let x = 5;', C: 'var x = 5;', D: 'x := 5;' },
        answer: 'A',
        explanation: 'let x: number = 5; declares a variable with a type.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define an interface in TypeScript?',
        options: { A: 'interface', B: 'type', C: 'class', D: 'struct' },
        answer: 'A',
        explanation: 'interface is used to define an interface.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you specify a function return type in TypeScript?',
        options: { A: 'function foo(): number {}', B: 'function foo() -> number {}', C: 'function foo() : number {}', D: 'function foo() returns number {}' },
        answer: 'A',
        explanation: 'function foo(): number {} specifies a return type.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which of the following is NOT a valid TypeScript type?',
        options: { A: 'string', B: 'number', C: 'boolean', D: 'real' },
        answer: 'D',
        explanation: 'real is not a valid TypeScript type.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'How do you enable strict type checking in TypeScript?',
        options: { A: 'strict: true in tsconfig.json', B: 'use strict;', C: 'enableStrict()', D: 'setStrict(true)' },
        answer: 'A',
        explanation: 'strict: true in tsconfig.json enables strict type checking.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which keyword is used to define a type alias?',
        options: { A: 'type', B: 'alias', C: 'typedef', D: 'as' },
        answer: 'A',
        explanation: 'type is used to define a type alias.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you import a module in TypeScript?',
        options: { A: 'import ... from ...', B: 'require(...)', C: 'include ...', D: 'use ...' },
        answer: 'A',
        explanation: 'import ... from ... is the correct syntax.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What does the "readonly" modifier do in TypeScript?',
        options: { A: 'Makes a property immutable', B: 'Makes a property optional', C: 'Makes a property private', D: 'Makes a property public' },
        answer: 'A',
        explanation: 'readonly makes a property immutable.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which tool is used to compile TypeScript to JavaScript?',
        options: { A: 'tsc', B: 'babel', C: 'webpack', D: 'node' },
        answer: 'A',
        explanation: 'tsc is the TypeScript compiler.',
        difficulty: 'advanced',
        category: 'concept'
      }
    ]
  },
  'Python': {
    beginner: [
      {
        question: 'What is the correct file extension for Python files?',
        options: { A: '.py', B: '.python', C: '.pt', D: '.pyt' },
        answer: 'A',
        explanation: 'Python files use the .py extension.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a function in Python?',
        options: { A: 'function', B: 'def', C: 'func', D: 'define' },
        answer: 'B',
        explanation: 'def is used to define a function in Python.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you print "Hello, World!" in Python?',
        options: { A: 'echo "Hello, World!"', B: 'print("Hello, World!")', C: 'console.log("Hello, World!")', D: 'printf("Hello, World!")' },
        answer: 'B',
        explanation: 'print("Hello, World!") prints to the console in Python.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used for comments in Python?',
        options: { A: '#', B: '//', C: '--', D: '/*' },
        answer: 'A',
        explanation: '# is used for single-line comments in Python.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you create a list in Python?',
        options: { A: 'list = []', B: 'list = {}', C: 'list = ()', D: 'list = <>' },
        answer: 'A',
        explanation: '[] is used to create a list in Python.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which function is used to get the length of a list?',
        options: { A: 'count()', B: 'size()', C: 'length()', D: 'len()' },
        answer: 'D',
        explanation: 'len() returns the length of a list.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you start a for loop in Python?',
        options: { A: 'for i in range(5):', B: 'for (i = 0; i < 5; i++)', C: 'foreach i in range(5)', D: 'loop i in range(5)' },
        answer: 'A',
        explanation: 'for i in range(5): is the correct syntax.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a class in Python?',
        options: { A: 'class', B: 'Class', C: 'define', D: 'struct' },
        answer: 'A',
        explanation: 'class is used to define a class in Python.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you import a module in Python?',
        options: { A: 'import module', B: 'require(module)', C: 'include module', D: 'use module' },
        answer: 'A',
        explanation: 'import module is the correct syntax.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to handle exceptions in Python?',
        options: { A: 'try', B: 'catch', C: 'except', D: 'finally' },
        answer: 'C',
        explanation: 'except is used to handle exceptions.',
        difficulty: 'beginner',
        category: 'syntax'
      }
    ],
    intermediate: [
      {
        question: 'What is the correct file extension for Python files?',
        options: { A: '.py', B: '.python', C: '.pt', D: '.pyt' },
        answer: 'A',
        explanation: 'Python files use the .py extension.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a function in Python?',
        options: { A: 'function', B: 'def', C: 'func', D: 'define' },
        answer: 'B',
        explanation: 'def is used to define a function in Python.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you print "Hello, World!" in Python?',
        options: { A: 'echo "Hello, World!"', B: 'print("Hello, World!")', C: 'console.log("Hello, World!")', D: 'printf("Hello, World!")' },
        answer: 'B',
        explanation: 'print("Hello, World!") prints to the console in Python.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used for comments in Python?',
        options: { A: '#', B: '//', C: '--', D: '/*' },
        answer: 'A',
        explanation: '# is used for single-line comments in Python.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you create a list in Python?',
        options: { A: 'list = []', B: 'list = {}', C: 'list = ()', D: 'list = <>' },
        answer: 'A',
        explanation: '[] is used to create a list in Python.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which function is used to get the length of a list?',
        options: { A: 'count()', B: 'size()', C: 'length()', D: 'len()' },
        answer: 'D',
        explanation: 'len() returns the length of a list.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you start a for loop in Python?',
        options: { A: 'for i in range(5):', B: 'for (i = 0; i < 5; i++)', C: 'foreach i in range(5)', D: 'loop i in range(5)' },
        answer: 'A',
        explanation: 'for i in range(5): is the correct syntax.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a class in Python?',
        options: { A: 'class', B: 'Class', C: 'define', D: 'struct' },
        answer: 'A',
        explanation: 'class is used to define a class in Python.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you import a module in Python?',
        options: { A: 'import module', B: 'require(module)', C: 'include module', D: 'use module' },
        answer: 'A',
        explanation: 'import module is the correct syntax.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to handle exceptions in Python?',
        options: { A: 'try', B: 'catch', C: 'except', D: 'finally' },
        answer: 'C',
        explanation: 'except is used to handle exceptions.',
        difficulty: 'intermediate',
        category: 'syntax'
      }
    ],
    advanced: [
      {
        question: 'What is the correct file extension for Python files?',
        options: { A: '.py', B: '.python', C: '.pt', D: '.pyt' },
        answer: 'A',
        explanation: 'Python files use the .py extension.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a function in Python?',
        options: { A: 'function', B: 'def', C: 'func', D: 'define' },
        answer: 'B',
        explanation: 'def is used to define a function in Python.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you print "Hello, World!" in Python?',
        options: { A: 'echo "Hello, World!"', B: 'print("Hello, World!")', C: 'console.log("Hello, World!")', D: 'printf("Hello, World!")' },
        answer: 'B',
        explanation: 'print("Hello, World!") prints to the console in Python.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used for comments in Python?',
        options: { A: '#', B: '//', C: '--', D: '/*' },
        answer: 'A',
        explanation: '# is used for single-line comments in Python.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you create a list in Python?',
        options: { A: 'list = []', B: 'list = {}', C: 'list = ()', D: 'list = <>' },
        answer: 'A',
        explanation: '[] is used to create a list in Python.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which function is used to get the length of a list?',
        options: { A: 'count()', B: 'size()', C: 'length()', D: 'len()' },
        answer: 'D',
        explanation: 'len() returns the length of a list.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you start a for loop in Python?',
        options: { A: 'for i in range(5):', B: 'for (i = 0; i < 5; i++)', C: 'foreach i in range(5)', D: 'loop i in range(5)' },
        answer: 'A',
        explanation: 'for i in range(5): is the correct syntax.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a class in Python?',
        options: { A: 'class', B: 'Class', C: 'define', D: 'struct' },
        answer: 'A',
        explanation: 'class is used to define a class in Python.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you import a module in Python?',
        options: { A: 'import module', B: 'require(module)', C: 'include module', D: 'use module' },
        answer: 'A',
        explanation: 'import module is the correct syntax.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to handle exceptions in Python?',
        options: { A: 'try', B: 'catch', C: 'except', D: 'finally' },
        answer: 'C',
        explanation: 'except is used to handle exceptions.',
        difficulty: 'advanced',
        category: 'syntax'
      }
    ]
  },
  'Java': {
    beginner: [
      {
        question: 'Which keyword is used to define a class in Java?',
        options: { A: 'class', B: 'Class', C: 'define', D: 'struct' },
        answer: 'A',
        explanation: 'class is used to define a class in Java.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which method is the entry point of a Java program?',
        options: { A: 'start()', B: 'main()', C: 'run()', D: 'init()' },
        answer: 'B',
        explanation: 'main() is the entry point of a Java program.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the correct way to declare a variable in Java?',
        options: { A: 'let x = 5;', B: 'int x = 5;', C: 'x := 5;', D: 'var x = 5;' },
        answer: 'B',
        explanation: 'int x = 5; declares an integer variable in Java.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used to end a statement in Java?',
        options: { A: '.', B: ';', C: ':', D: ',' },
        answer: 'B',
        explanation: 'Statements in Java end with a semicolon (;).',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you write a single-line comment in Java?',
        options: { A: '#', B: '//', C: '--', D: '/*' },
        answer: 'B',
        explanation: '// is used for single-line comments in Java.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to inherit a class in Java?',
        options: { A: 'extends', B: 'implements', C: 'inherits', D: 'super' },
        answer: 'A',
        explanation: 'extends is used for inheritance.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which access modifier makes a member visible to all classes?',
        options: { A: 'private', B: 'protected', C: 'public', D: 'default' },
        answer: 'C',
        explanation: 'public makes a member visible to all classes.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is the default value of an int variable in Java?',
        options: { A: '0', B: 'null', C: 'undefined', D: '1' },
        answer: 'A',
        explanation: 'The default value of int is 0.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which keyword is used to create an object in Java?',
        options: { A: 'new', B: 'create', C: 'object', D: 'instance' },
        answer: 'A',
        explanation: 'new is used to create objects.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which method is used to print output in Java?',
        options: { A: 'print()', B: 'System.out.println()', C: 'echo()', D: 'console.log()' },
        answer: 'B',
        explanation: 'System.out.println() prints output in Java.',
        difficulty: 'beginner',
        category: 'syntax'
      }
    ],
    intermediate: [
      {
        question: 'Which keyword is used to define a class in Java?',
        options: { A: 'class', B: 'Class', C: 'define', D: 'struct' },
        answer: 'A',
        explanation: 'class is used to define a class in Java.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which method is the entry point of a Java program?',
        options: { A: 'start()', B: 'main()', C: 'run()', D: 'init()' },
        answer: 'B',
        explanation: 'main() is the entry point of a Java program.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the correct way to declare a variable in Java?',
        options: { A: 'let x = 5;', B: 'int x = 5;', C: 'x := 5;', D: 'var x = 5;' },
        answer: 'B',
        explanation: 'int x = 5; declares an integer variable in Java.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used to end a statement in Java?',
        options: { A: '.', B: ';', C: ':', D: ',' },
        answer: 'B',
        explanation: 'Statements in Java end with a semicolon (;).',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you write a single-line comment in Java?',
        options: { A: '#', B: '//', C: '--', D: '/*' },
        answer: 'B',
        explanation: '// is used for single-line comments in Java.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to inherit a class in Java?',
        options: { A: 'extends', B: 'implements', C: 'inherits', D: 'super' },
        answer: 'A',
        explanation: 'extends is used for inheritance.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which access modifier makes a member visible to all classes?',
        options: { A: 'private', B: 'protected', C: 'public', D: 'default' },
        answer: 'C',
        explanation: 'public makes a member visible to all classes.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is the default value of an int variable in Java?',
        options: { A: '0', B: 'null', C: 'undefined', D: '1' },
        answer: 'A',
        explanation: 'The default value of int is 0.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which keyword is used to create an object in Java?',
        options: { A: 'new', B: 'create', C: 'object', D: 'instance' },
        answer: 'A',
        explanation: 'new is used to create objects.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which method is used to print output in Java?',
        options: { A: 'print()', B: 'System.out.println()', C: 'echo()', D: 'console.log()' },
        answer: 'B',
        explanation: 'System.out.println() prints output in Java.',
        difficulty: 'intermediate',
        category: 'syntax'
      }
    ],
    advanced: [
      {
        question: 'Which keyword is used to define a class in Java?',
        options: { A: 'class', B: 'Class', C: 'define', D: 'struct' },
        answer: 'A',
        explanation: 'class is used to define a class in Java.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which method is the entry point of a Java program?',
        options: { A: 'start()', B: 'main()', C: 'run()', D: 'init()' },
        answer: 'B',
        explanation: 'main() is the entry point of a Java program.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the correct way to declare a variable in Java?',
        options: { A: 'let x = 5;', B: 'int x = 5;', C: 'x := 5;', D: 'var x = 5;' },
        answer: 'B',
        explanation: 'int x = 5; declares an integer variable in Java.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used to end a statement in Java?',
        options: { A: '.', B: ';', C: ':', D: ',' },
        answer: 'B',
        explanation: 'Statements in Java end with a semicolon (;).',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you write a single-line comment in Java?',
        options: { A: '#', B: '//', C: '--', D: '/*' },
        answer: 'B',
        explanation: '// is used for single-line comments in Java.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to inherit a class in Java?',
        options: { A: 'extends', B: 'implements', C: 'inherits', D: 'super' },
        answer: 'A',
        explanation: 'extends is used for inheritance.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which access modifier makes a member visible to all classes?',
        options: { A: 'private', B: 'protected', C: 'public', D: 'default' },
        answer: 'C',
        explanation: 'public makes a member visible to all classes.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is the default value of an int variable in Java?',
        options: { A: '0', B: 'null', C: 'undefined', D: '1' },
        answer: 'A',
        explanation: 'The default value of int is 0.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which keyword is used to create an object in Java?',
        options: { A: 'new', B: 'create', C: 'object', D: 'instance' },
        answer: 'A',
        explanation: 'new is used to create objects.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which method is used to print output in Java?',
        options: { A: 'print()', B: 'System.out.println()', C: 'echo()', D: 'console.log()' },
        answer: 'B',
        explanation: 'System.out.println() prints output in Java.',
        difficulty: 'advanced',
        category: 'syntax'
      }
    ]
  },
  'C++': {
    beginner: [
      {
        question: 'Which symbol is used to end a statement in C++?',
        options: { A: '.', B: ';', C: ':', D: ',' },
        answer: 'B',
        explanation: 'Statements in C++ end with a semicolon (;).',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which header file is required for input/output in C++?',
        options: { A: '<iostream>', B: '<stdio.h>', C: '<input.h>', D: '<stream.h>' },
        answer: 'A',
        explanation: '<iostream> is used for input/output in C++.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you write a single-line comment in C++?',
        options: { A: '#', B: '//', C: '--', D: '/*' },
        answer: 'B',
        explanation: '// is used for single-line comments in C++.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a class in C++?',
        options: { A: 'class', B: 'Class', C: 'define', D: 'struct' },
        answer: 'A',
        explanation: 'class is used to define a class in C++.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which operator is used for input in C++?',
        options: { A: '>>', B: '<<', C: '**', D: '&&' },
        answer: 'A',
        explanation: '>> is the extraction operator for input.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which operator is used for output in C++?',
        options: { A: '<<', B: '>>', C: '**', D: '||' },
        answer: 'A',
        explanation: '<< is the insertion operator for output.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which function is used to print output in C++?',
        options: { A: 'printf()', B: 'System.out.println()', C: 'cout', D: 'echo()' },
        answer: 'C',
        explanation: 'cout is used for output in C++.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to inherit a class in C++?',
        options: { A: 'extends', B: 'inherits', C: ':', D: 'public' },
        answer: 'D',
        explanation: 'public is used for inheritance in C++.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which function is the entry point of a C++ program?',
        options: { A: 'start()', B: 'main()', C: 'run()', D: 'init()' },
        answer: 'B',
        explanation: 'main() is the entry point of a C++ program.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a constant in C++?',
        options: { A: 'const', B: 'define', C: 'static', D: 'final' },
        answer: 'A',
        explanation: 'const is used to define constants in C++.',
        difficulty: 'beginner',
        category: 'syntax'
      }
    ],
    intermediate: [
      {
        question: 'Which symbol is used to end a statement in C++?',
        options: { A: '.', B: ';', C: ':', D: ',' },
        answer: 'B',
        explanation: 'Statements in C++ end with a semicolon (;).',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which header file is required for input/output in C++?',
        options: { A: '<iostream>', B: '<stdio.h>', C: '<input.h>', D: '<stream.h>' },
        answer: 'A',
        explanation: '<iostream> is used for input/output in C++.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you write a single-line comment in C++?',
        options: { A: '#', B: '//', C: '--', D: '/*' },
        answer: 'B',
        explanation: '// is used for single-line comments in C++.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a class in C++?',
        options: { A: 'class', B: 'Class', C: 'define', D: 'struct' },
        answer: 'A',
        explanation: 'class is used to define a class in C++.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which operator is used for input in C++?',
        options: { A: '>>', B: '<<', C: '**', D: '&&' },
        answer: 'A',
        explanation: '>> is the extraction operator for input.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which operator is used for output in C++?',
        options: { A: '<<', B: '>>', C: '**', D: '||' },
        answer: 'A',
        explanation: '<< is the insertion operator for output.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which function is used to print output in C++?',
        options: { A: 'printf()', B: 'System.out.println()', C: 'cout', D: 'echo()' },
        answer: 'C',
        explanation: 'cout is used for output in C++.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to inherit a class in C++?',
        options: { A: 'extends', B: 'inherits', C: ':', D: 'public' },
        answer: 'D',
        explanation: 'public is used for inheritance in C++.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which function is the entry point of a C++ program?',
        options: { A: 'start()', B: 'main()', C: 'run()', D: 'init()' },
        answer: 'B',
        explanation: 'main() is the entry point of a C++ program.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a constant in C++?',
        options: { A: 'const', B: 'define', C: 'static', D: 'final' },
        answer: 'A',
        explanation: 'const is used to define constants in C++.',
        difficulty: 'intermediate',
        category: 'syntax'
      }
    ],
    advanced: [
      {
        question: 'Which symbol is used to end a statement in C++?',
        options: { A: '.', B: ';', C: ':', D: ',' },
        answer: 'B',
        explanation: 'Statements in C++ end with a semicolon (;).',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which header file is required for input/output in C++?',
        options: { A: '<iostream>', B: '<stdio.h>', C: '<input.h>', D: '<stream.h>' },
        answer: 'A',
        explanation: '<iostream> is used for input/output in C++.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you write a single-line comment in C++?',
        options: { A: '#', B: '//', C: '--', D: '/*' },
        answer: 'B',
        explanation: '// is used for single-line comments in C++.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a class in C++?',
        options: { A: 'class', B: 'Class', C: 'define', D: 'struct' },
        answer: 'A',
        explanation: 'class is used to define a class in C++.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which operator is used for input in C++?',
        options: { A: '>>', B: '<<', C: '**', D: '&&' },
        answer: 'A',
        explanation: '>> is the extraction operator for input.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which operator is used for output in C++?',
        options: { A: '<<', B: '>>', C: '**', D: '||' },
        answer: 'A',
        explanation: '<< is the insertion operator for output.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which function is used to print output in C++?',
        options: { A: 'printf()', B: 'System.out.println()', C: 'cout', D: 'echo()' },
        answer: 'C',
        explanation: 'cout is used for output in C++.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to inherit a class in C++?',
        options: { A: 'extends', B: 'inherits', C: ':', D: 'public' },
        answer: 'D',
        explanation: 'public is used for inheritance in C++.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which function is the entry point of a C++ program?',
        options: { A: 'start()', B: 'main()', C: 'run()', D: 'init()' },
        answer: 'B',
        explanation: 'main() is the entry point of a C++ program.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a constant in C++?',
        options: { A: 'const', B: 'define', C: 'static', D: 'final' },
        answer: 'A',
        explanation: 'const is used to define constants in C++.',
        difficulty: 'advanced',
        category: 'syntax'
      }
    ]
  },
  'PHP': {
    beginner: [
      {
        question: 'What does PHP stand for?',
        options: { A: 'PHP: Hypertext Preprocessor', B: 'Personal Home Page', C: 'Private Home Page', D: 'Preprocessor Home Page' },
        answer: 'A',
        explanation: 'PHP stands for PHP: Hypertext Preprocessor.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which symbol is used to start a variable in PHP?',
        options: { A: '$', B: '#', C: '@', D: '%' },
        answer: 'A',
        explanation: 'Variables in PHP start with $.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which function is used to output text in PHP?',
        options: { A: 'echo', B: 'print', C: 'printf', D: 'All of the above' },
        answer: 'D',
        explanation: 'echo, print, and printf can all output text in PHP.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you write a single-line comment in PHP?',
        options: { A: '//', B: '#', C: '--', D: '/*' },
        answer: 'A',
        explanation: '// is used for single-line comments in PHP.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which tag is used to start PHP code?',
        options: { A: '<?php', B: '<php>', C: '<?', D: '<script>' },
        answer: 'A',
        explanation: '<?php is used to start PHP code.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which function is used to get the length of a string in PHP?',
        options: { A: 'strlen()', B: 'length()', C: 'count()', D: 'size()' },
        answer: 'A',
        explanation: 'strlen() returns the length of a string.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you create an array in PHP?',
        options: { A: 'array()', B: '[]', C: '{}', D: 'array[]' },
        answer: 'A',
        explanation: 'array() is used to create an array in PHP.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which operator is used for concatenation in PHP?',
        options: { A: '+', B: '.', C: '&', D: '++' },
        answer: 'B',
        explanation: '. is used for string concatenation in PHP.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a constant in PHP?',
        options: { A: 'const', B: 'define', C: 'constant', D: 'static' },
        answer: 'B',
        explanation: 'define is used to define constants in PHP.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which superglobal is used to collect form data in PHP?',
        options: { A: '$_POST', B: '$_GET', C: '$_REQUEST', D: 'All of the above' },
        answer: 'D',
        explanation: '$_POST, $_GET, and $_REQUEST can all collect form data.',
        difficulty: 'beginner',
        category: 'concept'
      }
    ],
    intermediate: [
      {
        question: 'Which symbol is used to end a statement in PHP?',
        options: { A: '.', B: ';', C: ':', D: ',' },
        answer: 'B',
        explanation: 'Statements in PHP end with a semicolon (;).',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used to start a variable in PHP?',
        options: { A: '$', B: '#', C: '@', D: '%' },
        answer: 'A',
        explanation: 'Variables in PHP start with $.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which function is used to output text in PHP?',
        options: { A: 'echo', B: 'print', C: 'printf', D: 'All of the above' },
        answer: 'D',
        explanation: 'echo, print, and printf can all output text in PHP.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you write a single-line comment in PHP?',
        options: { A: '//', B: '#', C: '--', D: '/*' },
        answer: 'A',
        explanation: '// is used for single-line comments in PHP.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which tag is used to start PHP code?',
        options: { A: '<?php', B: '<php>', C: '<?', D: '<script>' },
        answer: 'A',
        explanation: '<?php is used to start PHP code.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which function is used to get the length of a string in PHP?',
        options: { A: 'strlen()', B: 'length()', C: 'count()', D: 'size()' },
        answer: 'A',
        explanation: 'strlen() returns the length of a string.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you create an array in PHP?',
        options: { A: 'array()', B: '[]', C: '{}', D: 'array[]' },
        answer: 'A',
        explanation: 'array() is used to create an array in PHP.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which operator is used for concatenation in PHP?',
        options: { A: '+', B: '.', C: '&', D: '++' },
        answer: 'B',
        explanation: '. is used for string concatenation in PHP.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a constant in PHP?',
        options: { A: 'const', B: 'define', C: 'constant', D: 'static' },
        answer: 'B',
        explanation: 'define is used to define constants in PHP.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which superglobal is used to collect form data in PHP?',
        options: { A: '$_POST', B: '$_GET', C: '$_REQUEST', D: 'All of the above' },
        answer: 'D',
        explanation: '$_POST, $_GET, and $_REQUEST can all collect form data.',
        difficulty: 'intermediate',
        category: 'concept'
      }
    ],
    advanced: [
      {
        question: 'Which symbol is used to end a statement in PHP?',
        options: { A: '.', B: ';', C: ':', D: ',' },
        answer: 'B',
        explanation: 'Statements in PHP end with a semicolon (;).',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used to start a variable in PHP?',
        options: { A: '$', B: '#', C: '@', D: '%' },
        answer: 'A',
        explanation: 'Variables in PHP start with $.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which function is used to output text in PHP?',
        options: { A: 'echo', B: 'print', C: 'printf', D: 'All of the above' },
        answer: 'D',
        explanation: 'echo, print, and printf can all output text in PHP.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you write a single-line comment in PHP?',
        options: { A: '//', B: '#', C: '--', D: '/*' },
        answer: 'A',
        explanation: '// is used for single-line comments in PHP.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which tag is used to start PHP code?',
        options: { A: '<?php', B: '<php>', C: '<?', D: '<script>' },
        answer: 'A',
        explanation: '<?php is used to start PHP code.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which function is used to get the length of a string in PHP?',
        options: { A: 'strlen()', B: 'length()', C: 'count()', D: 'size()' },
        answer: 'A',
        explanation: 'strlen() returns the length of a string.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you create an array in PHP?',
        options: { A: 'array()', B: '[]', C: '{}', D: 'array[]' },
        answer: 'A',
        explanation: 'array() is used to create an array in PHP.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which operator is used for concatenation in PHP?',
        options: { A: '+', B: '.', C: '&', D: '++' },
        answer: 'B',
        explanation: '. is used for string concatenation in PHP.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a constant in PHP?',
        options: { A: 'const', B: 'define', C: 'constant', D: 'static' },
        answer: 'B',
        explanation: 'define is used to define constants in PHP.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which superglobal is used to collect form data in PHP?',
        options: { A: '$_POST', B: '$_GET', C: '$_REQUEST', D: 'All of the above' },
        answer: 'D',
        explanation: '$_POST, $_GET, and $_REQUEST can all collect form data.',
        difficulty: 'advanced',
        category: 'concept'
      }
    ]
  },
  'Rust': {
    beginner: [
      {
        question: 'What is Rust?',
        options: { A: 'A systems programming language', B: 'A CSS framework', C: 'A database', D: 'A JavaScript library' },
        answer: 'A',
        explanation: 'Rust is a systems programming language.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which keyword is used to define a function in Rust?',
        options: { A: 'fn', B: 'function', C: 'def', D: 'func' },
        answer: 'A',
        explanation: 'fn is used to define a function in Rust.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you declare a variable in Rust?',
        options: { A: 'let', B: 'var', C: 'const', D: 'define' },
        answer: 'A',
        explanation: 'let is used to declare variables in Rust.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used for single-line comments in Rust?',
        options: { A: '//', B: '#', C: '--', D: '/*' },
        answer: 'A',
        explanation: '// is used for single-line comments in Rust.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which function is used to print output in Rust?',
        options: { A: 'println!()', B: 'print()', C: 'echo()', D: 'System.out.println()' },
        answer: 'A',
        explanation: 'println!() prints output in Rust.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a constant in Rust?',
        options: { A: 'const', B: 'let', C: 'static', D: 'define' },
        answer: 'A',
        explanation: 'const is used to define constants in Rust.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you create a mutable variable in Rust?',
        options: { A: 'let mut', B: 'mut let', C: 'var mut', D: 'let mutable' },
        answer: 'A',
        explanation: 'let mut creates a mutable variable.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a module in Rust?',
        options: { A: 'mod', B: 'module', C: 'package', D: 'use' },
        answer: 'A',
        explanation: 'mod is used to define a module.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which macro is used to print debug information in Rust?',
        options: { A: 'dbg!()', B: 'debug!()', C: 'log!()', D: 'trace!()' },
        answer: 'A',
        explanation: 'dbg!() prints debug information.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to import a crate in Rust?',
        options: { A: 'use', B: 'import', C: 'include', D: 'require' },
        answer: 'A',
        explanation: 'use is used to import crates in Rust.',
        difficulty: 'beginner',
        category: 'syntax'
      }
    ],
    intermediate: [
      {
        question: 'Which keyword is used to define a function in Rust?',
        options: { A: 'fn', B: 'function', C: 'def', D: 'func' },
        answer: 'A',
        explanation: 'fn is used to define a function in Rust.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you declare a variable in Rust?',
        options: { A: 'let', B: 'var', C: 'const', D: 'define' },
        answer: 'A',
        explanation: 'let is used to declare variables in Rust.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used for single-line comments in Rust?',
        options: { A: '//', B: '#', C: '--', D: '/*' },
        answer: 'A',
        explanation: '// is used for single-line comments in Rust.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which function is used to print output in Rust?',
        options: { A: 'println!()', B: 'print()', C: 'echo()', D: 'System.out.println()' },
        answer: 'A',
        explanation: 'println!() prints output in Rust.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a constant in Rust?',
        options: { A: 'const', B: 'let', C: 'static', D: 'define' },
        answer: 'A',
        explanation: 'const is used to define constants in Rust.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you create a mutable variable in Rust?',
        options: { A: 'let mut', B: 'mut let', C: 'var mut', D: 'let mutable' },
        answer: 'A',
        explanation: 'let mut creates a mutable variable.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a module in Rust?',
        options: { A: 'mod', B: 'module', C: 'package', D: 'use' },
        answer: 'A',
        explanation: 'mod is used to define a module.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which macro is used to print debug information in Rust?',
        options: { A: 'dbg!()', B: 'debug!()', C: 'log!()', D: 'trace!()' },
        answer: 'A',
        explanation: 'dbg!() prints debug information.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to import a crate in Rust?',
        options: { A: 'use', B: 'import', C: 'include', D: 'require' },
        answer: 'A',
        explanation: 'use is used to import crates in Rust.',
        difficulty: 'intermediate',
        category: 'syntax'
      }
    ],
    advanced: [
      {
        question: 'Which keyword is used to define a function in Rust?',
        options: { A: 'fn', B: 'function', C: 'def', D: 'func' },
        answer: 'A',
        explanation: 'fn is used to define a function in Rust.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you declare a variable in Rust?',
        options: { A: 'let', B: 'var', C: 'const', D: 'define' },
        answer: 'A',
        explanation: 'let is used to declare variables in Rust.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which symbol is used for single-line comments in Rust?',
        options: { A: '//', B: '#', C: '--', D: '/*' },
        answer: 'A',
        explanation: '// is used for single-line comments in Rust.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which function is used to print output in Rust?',
        options: { A: 'println!()', B: 'print()', C: 'echo()', D: 'System.out.println()' },
        answer: 'A',
        explanation: 'println!() prints output in Rust.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a constant in Rust?',
        options: { A: 'const', B: 'let', C: 'static', D: 'define' },
        answer: 'A',
        explanation: 'const is used to define constants in Rust.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you create a mutable variable in Rust?',
        options: { A: 'let mut', B: 'mut let', C: 'var mut', D: 'let mutable' },
        answer: 'A',
        explanation: 'let mut creates a mutable variable.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to define a module in Rust?',
        options: { A: 'mod', B: 'module', C: 'package', D: 'use' },
        answer: 'A',
        explanation: 'mod is used to define a module.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which macro is used to print debug information in Rust?',
        options: { A: 'dbg!()', B: 'debug!()', C: 'log!()', D: 'trace!()' },
        answer: 'A',
        explanation: 'dbg!() prints debug information.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which keyword is used to import a crate in Rust?',
        options: { A: 'use', B: 'import', C: 'include', D: 'require' },
        answer: 'A',
        explanation: 'use is used to import crates in Rust.',
        difficulty: 'advanced',
        category: 'syntax'
      }
    ]
  },
  'HTML': {
    beginner: [
      {
        question: 'What does HTML stand for?',
        options: {
          'A': 'Hyper Text Markup Language',
          'B': 'Home Tool Markup Language',
          'C': 'Hyperlinks and Text Mark Language',
          'D': 'Hyperlinking Text Markup Language'
        },
        answer: 'A',
        explanation: 'HTML stands for Hyper Text Markup Language.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which HTML tag is used to create a hyperlink?',
        options: {
          'A': '<a>',
          'B': '<link>',
          'C': '<href>',
          'D': '<hyper>'
        },
        answer: 'A',
        explanation: 'The <a> tag is used to create hyperlinks in HTML.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the correct HTML element for inserting a line break?',
        options: {
          'A': '<break>',
          'B': '<br>',
          'C': '<lb>',
          'D': '<line>'
        },
        answer: 'B',
        explanation: 'The <br> tag inserts a line break.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which tag is used for the largest heading?',
        options: {
          'A': '<heading>',
          'B': '<h6>',
          'C': '<h1>',
          'D': '<head>'
        },
        answer: 'C',
        explanation: '<h1> is the largest heading tag.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the correct HTML for adding a background color?',
        options: {
          'A': '<body bg="yellow">',
          'B': '<body style="background-color:yellow;">',
          'C': '<background>yellow</background>',
          'D': '<body color="yellow">'
        },
        answer: 'B',
        explanation: 'Use the style attribute: <body style="background-color:yellow;">',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which HTML tag is used to display an image?',
        options: {
          'A': '<img>',
          'B': '<picture>',
          'C': '<src>',
          'D': '<image>'
        },
        answer: 'A',
        explanation: 'The <img> tag is used to display images.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you create an ordered list?',
        options: {
          'A': '<ul>',
          'B': '<ol>',
          'C': '<li>',
          'D': '<list>'
        },
        answer: 'B',
        explanation: '<ol> creates an ordered (numbered) list.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which tag is used to define a table row?',
        options: {
          'A': '<td>',
          'B': '<tr>',
          'C': '<th>',
          'D': '<table>'
        },
        answer: 'B',
        explanation: '<tr> defines a table row.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the correct HTML for making a checkbox?',
        options: {
          'A': '<input type="checkbox">',
          'B': '<checkbox>',
          'C': '<input checkbox>',
          'D': '<check>'
        },
        answer: 'A',
        explanation: 'Use <input type="checkbox"> to create a checkbox.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which tag is used to define emphasized text?',
        options: {
          'A': '<i>',
          'B': '<em>',
          'C': '<strong>',
          'D': '<italic>'
        },
        answer: 'B',
        explanation: '<em> is used for emphasized text.',
        difficulty: 'beginner',
        category: 'syntax'
      }
    ],
    intermediate: [
      {
        question: 'Which HTML tag is used to create a hyperlink?',
        options: {
          'A': '<a>',
          'B': '<link>',
          'C': '<href>',
          'D': '<hyper>'
        },
        answer: 'A',
        explanation: 'The <a> tag is used to create hyperlinks in HTML.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the correct HTML element for inserting a line break?',
        options: {
          'A': '<break>',
          'B': '<br>',
          'C': '<lb>',
          'D': '<line>'
        },
        answer: 'B',
        explanation: 'The <br> tag inserts a line break.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which tag is used for the largest heading?',
        options: {
          'A': '<heading>',
          'B': '<h6>',
          'C': '<h1>',
          'D': '<head>'
        },
        answer: 'C',
        explanation: '<h1> is the largest heading tag.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the correct HTML for adding a background color?',
        options: {
          'A': '<body bg="yellow">',
          'B': '<body style="background-color:yellow;">',
          'C': '<background>yellow</background>',
          'D': '<body color="yellow">'
        },
        answer: 'B',
        explanation: 'Use the style attribute: <body style="background-color:yellow;">',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which HTML tag is used to display an image?',
        options: {
          'A': '<img>',
          'B': '<picture>',
          'C': '<src>',
          'D': '<image>'
        },
        answer: 'A',
        explanation: 'The <img> tag is used to display images.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you create an ordered list?',
        options: {
          'A': '<ul>',
          'B': '<ol>',
          'C': '<li>',
          'D': '<list>'
        },
        answer: 'B',
        explanation: '<ol> creates an ordered (numbered) list.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which tag is used to define a table row?',
        options: {
          'A': '<td>',
          'B': '<tr>',
          'C': '<th>',
          'D': '<table>'
        },
        answer: 'B',
        explanation: '<tr> defines a table row.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the correct HTML for making a checkbox?',
        options: {
          'A': '<input type="checkbox">',
          'B': '<checkbox>',
          'C': '<input checkbox>',
          'D': '<check>'
        },
        answer: 'A',
        explanation: 'Use <input type="checkbox"> to create a checkbox.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which tag is used to define emphasized text?',
        options: {
          'A': '<i>',
          'B': '<em>',
          'C': '<strong>',
          'D': '<italic>'
        },
        answer: 'B',
        explanation: '<em> is used for emphasized text.',
        difficulty: 'intermediate',
        category: 'syntax'
      }
    ],
    advanced: [
      {
        question: 'Which HTML tag is used to create a hyperlink?',
        options: {
          'A': '<a>',
          'B': '<link>',
          'C': '<href>',
          'D': '<hyper>'
        },
        answer: 'A',
        explanation: 'The <a> tag is used to create hyperlinks in HTML.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the correct HTML element for inserting a line break?',
        options: {
          'A': '<break>',
          'B': '<br>',
          'C': '<lb>',
          'D': '<line>'
        },
        answer: 'B',
        explanation: 'The <br> tag inserts a line break.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which tag is used for the largest heading?',
        options: {
          'A': '<heading>',
          'B': '<h6>',
          'C': '<h1>',
          'D': '<head>'
        },
        answer: 'C',
        explanation: '<h1> is the largest heading tag.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the correct HTML for adding a background color?',
        options: {
          'A': '<body bg="yellow">',
          'B': '<body style="background-color:yellow;">',
          'C': '<background>yellow</background>',
          'D': '<body color="yellow">'
        },
        answer: 'B',
        explanation: 'Use the style attribute: <body style="background-color:yellow;">',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which HTML tag is used to display an image?',
        options: {
          'A': '<img>',
          'B': '<picture>',
          'C': '<src>',
          'D': '<image>'
        },
        answer: 'A',
        explanation: 'The <img> tag is used to display images.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you create an ordered list?',
        options: {
          'A': '<ul>',
          'B': '<ol>',
          'C': '<li>',
          'D': '<list>'
        },
        answer: 'B',
        explanation: '<ol> creates an ordered (numbered) list.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which tag is used to define a table row?',
        options: {
          'A': '<td>',
          'B': '<tr>',
          'C': '<th>',
          'D': '<table>'
        },
        answer: 'B',
        explanation: '<tr> defines a table row.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the correct HTML for making a checkbox?',
        options: {
          'A': '<input type="checkbox">',
          'B': '<checkbox>',
          'C': '<input checkbox>',
          'D': '<check>'
        },
        answer: 'A',
        explanation: 'Use <input type="checkbox"> to create a checkbox.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which tag is used to define emphasized text?',
        options: {
          'A': '<i>',
          'B': '<em>',
          'C': '<strong>',
          'D': '<italic>'
        },
        answer: 'B',
        explanation: '<em> is used for emphasized text.',
        difficulty: 'advanced',
        category: 'syntax'
      }
    ]
  },
  'CSS': {
    beginner: [
      {
        question: 'What does CSS stand for?',
        options: {
          'A': 'Cascading Style Sheets',
          'B': 'Computer Style Sheets',
          'C': 'Creative Style System',
          'D': 'Colorful Style Syntax'
        },
        answer: 'A',
        explanation: 'CSS stands for Cascading Style Sheets.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which property is used to change the text color of an element?',
        options: {
          'A': 'font-color',
          'B': 'color',
          'C': 'text-color',
          'D': 'background-color'
        },
        answer: 'B',
        explanation: 'The color property changes the text color.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you select an element with id="header" in CSS?',
        options: {
          'A': '.header',
          'B': '#header',
          'C': 'header',
          'D': '*header*'
        },
        answer: 'B',
        explanation: 'Use #header to select by id.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which CSS property controls the size of text?',
        options: {
          'A': 'font-style',
          'B': 'text-size',
          'C': 'font-size',
          'D': 'text-style'
        },
        answer: 'C',
        explanation: 'font-size controls the size of text.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you make all <p> elements bold?',
        options: {
          'A': 'p {font-weight: bold;}',
          'B': 'p {font: bold;}',
          'C': 'p {text-style: bold;}',
          'D': 'p {style: bold;}'
        },
        answer: 'A',
        explanation: 'font-weight: bold makes text bold.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which property is used to change the background color?',
        options: {
          'A': 'color',
          'B': 'background-color',
          'C': 'bgcolor',
          'D': 'background-style'
        },
        answer: 'B',
        explanation: 'background-color changes the background color.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you add a comment in CSS?',
        options: {
          'A': '// this is a comment',
          'B': '<!-- this is a comment -->',
          'C': '/* this is a comment */',
          'D': '# this is a comment'
        },
        answer: 'C',
        explanation: 'CSS comments are written as /* comment */.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which selector selects all <a> elements inside <div>?',
        options: {
          'A': 'div a',
          'B': 'div.a',
          'C': 'div > a',
          'D': 'a div'
        },
        answer: 'A',
        explanation: 'div a selects all <a> inside <div>.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you make a list with no bullets?',
        options: {
          'A': 'list-style: none;',
          'B': 'bullet: none;',
          'C': 'list-type: none;',
          'D': 'text-decoration: none;'
        },
        answer: 'A',
        explanation: 'list-style: none removes bullets.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which property is used to add space inside an element\'s border?',
        options: {
          'A': 'margin',
          'B': 'padding',
          'C': 'border-spacing',
          'D': 'spacing'
        },
        answer: 'B',
        explanation: 'padding adds space inside the border.',
        difficulty: 'beginner',
        category: 'syntax'
      }
    ],
    intermediate: [
      {
        question: 'Which property is used to change the text color of an element?',
        options: {
          'A': 'font-color',
          'B': 'color',
          'C': 'text-color',
          'D': 'background-color'
        },
        answer: 'B',
        explanation: 'The color property changes the text color.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you select an element with id="header" in CSS?',
        options: {
          'A': '.header',
          'B': '#header',
          'C': 'header',
          'D': '*header*'
        },
        answer: 'B',
        explanation: 'Use #header to select by id.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which CSS property controls the size of text?',
        options: {
          'A': 'font-style',
          'B': 'text-size',
          'C': 'font-size',
          'D': 'text-style'
        },
        answer: 'C',
        explanation: 'font-size controls the size of text.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you make all <p> elements bold?',
        options: {
          'A': 'p {font-weight: bold;}',
          'B': 'p {font: bold;}',
          'C': 'p {text-style: bold;}',
          'D': 'p {style: bold;}'
        },
        answer: 'A',
        explanation: 'font-weight: bold makes text bold.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which property is used to change the background color?',
        options: {
          'A': 'color',
          'B': 'background-color',
          'C': 'bgcolor',
          'D': 'background-style'
        },
        answer: 'B',
        explanation: 'background-color changes the background color.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you add a comment in CSS?',
        options: {
          'A': '// this is a comment',
          'B': '<!-- this is a comment -->',
          'C': '/* this is a comment */',
          'D': '# this is a comment'
        },
        answer: 'C',
        explanation: 'CSS comments are written as /* comment */.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which selector selects all <a> elements inside <div>?',
        options: {
          'A': 'div a',
          'B': 'div.a',
          'C': 'div > a',
          'D': 'a div'
        },
        answer: 'A',
        explanation: 'div a selects all <a> inside <div>.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you make a list with no bullets?',
        options: {
          'A': 'list-style: none;',
          'B': 'bullet: none;',
          'C': 'list-type: none;',
          'D': 'text-decoration: none;'
        },
        answer: 'A',
        explanation: 'list-style: none removes bullets.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which property is used to add space inside an element\'s border?',
        options: {
          'A': 'margin',
          'B': 'padding',
          'C': 'border-spacing',
          'D': 'spacing'
        },
        answer: 'B',
        explanation: 'padding adds space inside the border.',
        difficulty: 'intermediate',
        category: 'syntax'
      }
    ],
    advanced: [
      {
        question: 'Which property is used to change the text color of an element?',
        options: {
          'A': 'font-color',
          'B': 'color',
          'C': 'text-color',
          'D': 'background-color'
        },
        answer: 'B',
        explanation: 'The color property changes the text color.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you select an element with id="header" in CSS?',
        options: {
          'A': '.header',
          'B': '#header',
          'C': 'header',
          'D': '*header*'
        },
        answer: 'B',
        explanation: 'Use #header to select by id.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which CSS property controls the size of text?',
        options: {
          'A': 'font-style',
          'B': 'text-size',
          'C': 'font-size',
          'D': 'text-style'
        },
        answer: 'C',
        explanation: 'font-size controls the size of text.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you make all <p> elements bold?',
        options: {
          'A': 'p {font-weight: bold;}',
          'B': 'p {font: bold;}',
          'C': 'p {text-style: bold;}',
          'D': 'p {style: bold;}'
        },
        answer: 'A',
        explanation: 'font-weight: bold makes text bold.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which property is used to change the background color?',
        options: {
          'A': 'color',
          'B': 'background-color',
          'C': 'bgcolor',
          'D': 'background-style'
        },
        answer: 'B',
        explanation: 'background-color changes the background color.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you add a comment in CSS?',
        options: {
          'A': '// this is a comment',
          'B': '<!-- this is a comment -->',
          'C': '/* this is a comment */',
          'D': '# this is a comment'
        },
        answer: 'C',
        explanation: 'CSS comments are written as /* comment */.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which selector selects all <a> elements inside <div>?',
        options: {
          'A': 'div a',
          'B': 'div.a',
          'C': 'div > a',
          'D': 'a div'
        },
        answer: 'A',
        explanation: 'div a selects all <a> inside <div>.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you make a list with no bullets?',
        options: {
          'A': 'list-style: none;',
          'B': 'bullet: none;',
          'C': 'list-type: none;',
          'D': 'text-decoration: none;'
        },
        answer: 'A',
        explanation: 'list-style: none removes bullets.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which property is used to add space inside an element\'s border?',
        options: {
          'A': 'margin',
          'B': 'padding',
          'C': 'border-spacing',
          'D': 'spacing'
        },
        answer: 'B',
        explanation: 'padding adds space inside the border.',
        difficulty: 'advanced',
        category: 'syntax'
      }
    ]
  },
  'Vue': {
    beginner: [
      {
        question: 'What is Vue.js?',
        options: {
          'A': 'A JavaScript framework for building user interfaces',
          'B': 'A CSS library',
          'C': 'A database',
          'D': 'A backend language'
        },
        answer: 'A',
        explanation: 'Vue.js is a JavaScript framework for building user interfaces.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which directive is used for conditional rendering in Vue?',
        options: {
          'A': 'v-if',
          'B': 'v-for',
          'C': 'v-show',
          'D': 'v-bind'
        },
        answer: 'A',
        explanation: 'v-if is used for conditional rendering.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you bind an attribute in Vue?',
        options: {
          'A': 'v-bind:attr',
          'B': ':attr',
          'C': 'Both A and B',
          'D': 'v-attr'
        },
        answer: 'C',
        explanation: 'You can use v-bind:attr or :attr to bind attributes.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the root instance property in Vue?',
        options: {
          'A': 'el',
          'B': 'data',
          'C': 'methods',
          'D': 'template'
        },
        answer: 'A',
        explanation: 'el is the root instance property.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which lifecycle hook is called after the instance has been mounted?',
        options: {
          'A': 'created',
          'B': 'mounted',
          'C': 'updated',
          'D': 'destroyed'
        },
        answer: 'B',
        explanation: 'mounted is called after the instance is mounted.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you handle user input in Vue?',
        options: {
          'A': 'v-model',
          'B': 'v-input',
          'C': 'v-bind',
          'D': 'v-on'
        },
        answer: 'A',
        explanation: 'v-model is used for two-way data binding with user input.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which directive is used for looping through items in Vue?',
        options: {
          'A': 'v-for',
          'B': 'v-loop',
          'C': 'v-repeat',
          'D': 'v-each'
        },
        answer: 'A',
        explanation: 'v-for is used for looping through items.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you listen to events in Vue?',
        options: {
          'A': 'v-on:event',
          'B': '@event',
          'C': 'Both A and B',
          'D': 'v-event'
        },
        answer: 'C',
        explanation: 'You can use v-on:event or @event to listen to events.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the default file extension for Vue components?',
        options: {
          'A': '.vue',
          'B': '.js',
          'C': '.component',
          'D': '.vjs'
        },
        answer: 'A',
        explanation: 'Vue components use the .vue file extension.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which property is used to define component data in Vue?',
        options: {
          'A': 'data',
          'B': 'props',
          'C': 'methods',
          'D': 'computed'
        },
        answer: 'A',
        explanation: 'The data property is used to define component data.',
        difficulty: 'beginner',
        category: 'concept'
      }
    ],
    intermediate: [
      {
        question: 'Which directive is used for conditional rendering in Vue?',
        options: {
          'A': 'v-if',
          'B': 'v-for',
          'C': 'v-show',
          'D': 'v-bind'
        },
        answer: 'A',
        explanation: 'v-if is used for conditional rendering.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you bind an attribute in Vue?',
        options: {
          'A': 'v-bind:attr',
          'B': ':attr',
          'C': 'Both A and B',
          'D': 'v-attr'
        },
        answer: 'C',
        explanation: 'You can use v-bind:attr or :attr to bind attributes.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the root instance property in Vue?',
        options: {
          'A': 'el',
          'B': 'data',
          'C': 'methods',
          'D': 'template'
        },
        answer: 'A',
        explanation: 'el is the root instance property.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which lifecycle hook is called after the instance has been mounted?',
        options: {
          'A': 'created',
          'B': 'mounted',
          'C': 'updated',
          'D': 'destroyed'
        },
        answer: 'B',
        explanation: 'mounted is called after the instance is mounted.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you handle user input in Vue?',
        options: {
          'A': 'v-model',
          'B': 'v-input',
          'C': 'v-bind',
          'D': 'v-on'
        },
        answer: 'A',
        explanation: 'v-model is used for two-way data binding with user input.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which directive is used for looping through items in Vue?',
        options: {
          'A': 'v-for',
          'B': 'v-loop',
          'C': 'v-repeat',
          'D': 'v-each'
        },
        answer: 'A',
        explanation: 'v-for is used for looping through items.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you listen to events in Vue?',
        options: {
          'A': 'v-on:event',
          'B': '@event',
          'C': 'Both A and B',
          'D': 'v-event'
        },
        answer: 'C',
        explanation: 'You can use v-on:event or @event to listen to events.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the default file extension for Vue components?',
        options: {
          'A': '.vue',
          'B': '.js',
          'C': '.component',
          'D': '.vjs'
        },
        answer: 'A',
        explanation: 'Vue components use the .vue file extension.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which property is used to define component data in Vue?',
        options: {
          'A': 'data',
          'B': 'props',
          'C': 'methods',
          'D': 'computed'
        },
        answer: 'A',
        explanation: 'The data property is used to define component data.',
        difficulty: 'intermediate',
        category: 'concept'
      }
    ],
    advanced: [
      {
        question: 'Which directive is used for conditional rendering in Vue?',
        options: {
          'A': 'v-if',
          'B': 'v-for',
          'C': 'v-show',
          'D': 'v-bind'
        },
        answer: 'A',
        explanation: 'v-if is used for conditional rendering.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you bind an attribute in Vue?',
        options: {
          'A': 'v-bind:attr',
          'B': ':attr',
          'C': 'Both A and B',
          'D': 'v-attr'
        },
        answer: 'C',
        explanation: 'You can use v-bind:attr or :attr to bind attributes.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the root instance property in Vue?',
        options: {
          'A': 'el',
          'B': 'data',
          'C': 'methods',
          'D': 'template'
        },
        answer: 'A',
        explanation: 'el is the root instance property.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which lifecycle hook is called after the instance has been mounted?',
        options: {
          'A': 'created',
          'B': 'mounted',
          'C': 'updated',
          'D': 'destroyed'
        },
        answer: 'B',
        explanation: 'mounted is called after the instance is mounted.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'How do you handle user input in Vue?',
        options: {
          'A': 'v-model',
          'B': 'v-input',
          'C': 'v-bind',
          'D': 'v-on'
        },
        answer: 'A',
        explanation: 'v-model is used for two-way data binding with user input.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which directive is used for looping through items in Vue?',
        options: {
          'A': 'v-for',
          'B': 'v-loop',
          'C': 'v-repeat',
          'D': 'v-each'
        },
        answer: 'A',
        explanation: 'v-for is used for looping through items.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you listen to events in Vue?',
        options: {
          'A': 'v-on:event',
          'B': '@event',
          'C': 'Both A and B',
          'D': 'v-event'
        },
        answer: 'C',
        explanation: 'You can use v-on:event or @event to listen to events.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the default file extension for Vue components?',
        options: {
          'A': '.vue',
          'B': '.js',
          'C': '.component',
          'D': '.vjs'
        },
        answer: 'A',
        explanation: 'Vue components use the .vue file extension.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which property is used to define component data in Vue?',
        options: {
          'A': 'data',
          'B': 'props',
          'C': 'methods',
          'D': 'computed'
        },
        answer: 'A',
        explanation: 'The data property is used to define component data.',
        difficulty: 'advanced',
        category: 'concept'
      }
    ]
  },
  'Angular': {
    beginner: [
      {
        question: 'What is Angular?',
        options: { A: 'A JavaScript framework for building user interfaces', B: 'A CSS framework', C: 'A database', D: 'A backend language' },
        answer: 'A',
        explanation: 'Angular is a JavaScript framework for building user interfaces.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which company developed Angular?',
        options: { A: 'Google', B: 'Facebook', C: 'Microsoft', D: 'Twitter' },
        answer: 'A',
        explanation: 'Google developed Angular.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a component in Angular?',
        options: { A: 'A reusable piece of UI', B: 'A CSS class', C: 'A database table', D: 'A server' },
        answer: 'A',
        explanation: 'A component is a reusable piece of UI.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a template in Angular?',
        options: { A: 'A JavaScript extension for XML-like syntax', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A template is a JavaScript extension for XML-like syntax.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which decorator is used for state in Angular?',
        options: { A: '@Component', B: '@Directive', C: '@Pipe', D: '@Injectable' },
        answer: 'A',
        explanation: '@Component is used for state in Angular.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you pass data to a child component in Angular?',
        options: { A: 'Using props', B: 'Using state', C: 'Using context', D: 'Using hooks' },
        answer: 'A',
        explanation: 'Props are used to pass data to child components in Angular.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is the default file extension for Angular components?',
        options: { A: '.ts', B: '.js', C: '.component', D: '.angular' },
        answer: 'A',
        explanation: 'Angular components often use the .ts extension.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which method is used to render a component in Angular?',
        options: { A: 'Component.render()', B: 'renderComponent()', C: 'createElement()', D: 'renderElement()' },
        answer: 'A',
        explanation: 'Component.render() is used to render a component in Angular.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the virtual DOM in Angular?',
        options: { A: 'A lightweight copy of the real DOM', B: 'A database', C: 'A server', D: 'A CSS framework' },
        answer: 'A',
        explanation: 'The virtual DOM is a lightweight copy of the real DOM in Angular.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you handle events in Angular?',
        options: { A: 'Using camelCase event handlers', B: 'Using lowercase event handlers', C: 'Using HTML event handlers', D: 'Using CSS event handlers' },
        answer: 'A',
        explanation: 'Angular uses camelCase event handlers (e.g., onClick).',
        difficulty: 'beginner',
        category: 'syntax'
      }
    ],
    intermediate: [
      {
        question: 'Which decorator is used for state in Angular?',
        options: { A: '@Component', B: '@Directive', C: '@Pipe', D: '@Injectable' },
        answer: 'A',
        explanation: '@Component is used for state in Angular.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you pass data to a child component in Angular?',
        options: { A: 'Using props', B: 'Using state', C: 'Using context', D: 'Using hooks' },
        answer: 'A',
        explanation: 'Props are used to pass data to child components in Angular.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is the default file extension for Angular components?',
        options: { A: '.ts', B: '.js', C: '.component', D: '.angular' },
        answer: 'A',
        explanation: 'Angular components often use the .ts extension.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which method is used to render a component in Angular?',
        options: { A: 'Component.render()', B: 'renderComponent()', C: 'createElement()', D: 'renderElement()' },
        answer: 'A',
        explanation: 'Component.render() is used to render a component in Angular.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the virtual DOM in Angular?',
        options: { A: 'A lightweight copy of the real DOM', B: 'A database', C: 'A server', D: 'A CSS framework' },
        answer: 'A',
        explanation: 'The virtual DOM is a lightweight copy of the real DOM in Angular.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you handle events in Angular?',
        options: { A: 'Using camelCase event handlers', B: 'Using lowercase event handlers', C: 'Using HTML event handlers', D: 'Using CSS event handlers' },
        answer: 'A',
        explanation: 'Angular uses camelCase event handlers (e.g., onClick).',
        difficulty: 'intermediate',
        category: 'syntax'
      }
    ],
    advanced: [
      {
        question: 'Which decorator is used for state in Angular?',
        options: { A: '@Component', B: '@Directive', C: '@Pipe', D: '@Injectable' },
        answer: 'A',
        explanation: '@Component is used for state in Angular.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you pass data to a child component in Angular?',
        options: { A: 'Using props', B: 'Using state', C: 'Using context', D: 'Using hooks' },
        answer: 'A',
        explanation: 'Props are used to pass data to child components in Angular.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is the default file extension for Angular components?',
        options: { A: '.ts', B: '.js', C: '.component', D: '.angular' },
        answer: 'A',
        explanation: 'Angular components often use the .ts extension.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which method is used to render a component in Angular?',
        options: { A: 'Component.render()', B: 'renderComponent()', C: 'createElement()', D: 'renderElement()' },
        answer: 'A',
        explanation: 'Component.render() is used to render a component in Angular.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the virtual DOM in Angular?',
        options: { A: 'A lightweight copy of the real DOM', B: 'A database', C: 'A server', D: 'A CSS framework' },
        answer: 'A',
        explanation: 'The virtual DOM is a lightweight copy of the real DOM in Angular.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'How do you handle events in Angular?',
        options: { A: 'Using camelCase event handlers', B: 'Using lowercase event handlers', C: 'Using HTML event handlers', D: 'Using CSS event handlers' },
        answer: 'A',
        explanation: 'Angular uses camelCase event handlers (e.g., onClick).',
        difficulty: 'advanced',
        category: 'syntax'
      }
    ]
  },
  'Node.js': {
    beginner: [
      {
        question: 'What is Node.js?',
        options: { A: 'A JavaScript runtime', B: 'A CSS framework', C: 'A database', D: 'A backend language' },
        answer: 'A',
        explanation: 'Node.js is a JavaScript runtime.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which company developed Node.js?',
        options: { A: 'Google', B: 'Facebook', C: 'Microsoft', D: 'Joyent' },
        answer: 'D',
        explanation: 'Joyent developed Node.js.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is an event loop in Node.js?',
        options: { A: 'A mechanism for handling asynchronous operations', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'An event loop is a mechanism for handling asynchronous operations in Node.js.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a module in Node.js?',
        options: { A: 'A reusable piece of code', B: 'A CSS class', C: 'A database table', D: 'A server' },
        answer: 'A',
        explanation: 'A module is a reusable piece of code in Node.js.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which module is used for file system operations?',
        options: { A: 'fs', B: 'http', C: 'path', D: 'url' },
        answer: 'A',
        explanation: 'fs is used for file system operations in Node.js.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you create a server in Node.js?',
        options: { A: 'Using http.createServer()', B: 'Using express.createServer()', C: 'Using http.createRequest()', D: 'Using express.createRequest()' },
        answer: 'A',
        explanation: 'http.createServer() is used to create a server in Node.js.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the default file extension for Node.js modules?',
        options: { A: '.js', B: '.node', C: '.module', D: '.nodejs' },
        answer: 'A',
        explanation: 'Node.js modules often use the .js extension.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'Which method is used to start the server?',
        options: { A: 'server.start()', B: 'server.listen()', C: 'server.run()', D: 'server.startServer()' },
        answer: 'B',
        explanation: 'server.listen() is used to start the server in Node.js.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is the event-driven architecture of Node.js?',
        options: { A: 'A lightweight copy of the real DOM', B: 'A database', C: 'A server', D: 'A CSS framework' },
        answer: 'A',
        explanation: 'Node.js is event-driven, meaning it handles requests asynchronously.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you handle errors in Node.js?',
        options: { A: 'Using try/catch blocks', B: 'Using .catch()', C: 'Using try/catch or .catch()', D: 'Errors cannot be handled' },
        answer: 'C',
        explanation: 'You can handle errors in Node.js using try/catch blocks or .catch() methods.',
        difficulty: 'beginner',
        category: 'best-practice'
      }
    ],
    intermediate: [
      {
        question: 'What is an event loop in Node.js?',
        options: { A: 'A mechanism for handling asynchronous operations', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'An event loop is a mechanism for handling asynchronous operations in Node.js.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is a module in Node.js?',
        options: { A: 'A reusable piece of code', B: 'A CSS class', C: 'A database table', D: 'A server' },
        answer: 'A',
        explanation: 'A module is a reusable piece of code in Node.js.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which module is used for file system operations?',
        options: { A: 'fs', B: 'http', C: 'path', D: 'url' },
        answer: 'A',
        explanation: 'fs is used for file system operations in Node.js.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you create a server in Node.js?',
        options: { A: 'Using http.createServer()', B: 'Using express.createServer()', C: 'Using http.createRequest()', D: 'Using express.createRequest()' },
        answer: 'A',
        explanation: 'http.createServer() is used to create a server in Node.js.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the default file extension for Node.js modules?',
        options: { A: '.js', B: '.node', C: '.module', D: '.nodejs' },
        answer: 'A',
        explanation: 'Node.js modules often use the .js extension.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'Which method is used to start the server?',
        options: { A: 'server.start()', B: 'server.listen()', C: 'server.run()', D: 'server.startServer()' },
        answer: 'B',
        explanation: 'server.listen() is used to start the server in Node.js.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is the event-driven architecture of Node.js?',
        options: { A: 'A lightweight copy of the real DOM', B: 'A database', C: 'A server', D: 'A CSS framework' },
        answer: 'A',
        explanation: 'Node.js is event-driven, meaning it handles requests asynchronously.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you handle errors in Node.js?',
        options: { A: 'Using try/catch blocks', B: 'Using .catch()', C: 'Using try/catch or .catch()', D: 'Errors cannot be handled' },
        answer: 'C',
        explanation: 'You can handle errors in Node.js using try/catch blocks or .catch() methods.',
        difficulty: 'intermediate',
        category: 'best-practice'
      }
    ],
    advanced: [
      {
        question: 'What is an event loop in Node.js?',
        options: { A: 'A mechanism for handling asynchronous operations', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'An event loop is a mechanism for handling asynchronous operations in Node.js.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is a module in Node.js?',
        options: { A: 'A reusable piece of code', B: 'A CSS class', C: 'A database table', D: 'A server' },
        answer: 'A',
        explanation: 'A module is a reusable piece of code in Node.js.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which module is used for file system operations?',
        options: { A: 'fs', B: 'http', C: 'path', D: 'url' },
        answer: 'A',
        explanation: 'fs is used for file system operations in Node.js.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'How do you create a server in Node.js?',
        options: { A: 'Using http.createServer()', B: 'Using express.createServer()', C: 'Using http.createRequest()', D: 'Using express.createRequest()' },
        answer: 'A',
        explanation: 'http.createServer() is used to create a server in Node.js.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the default file extension for Node.js modules?',
        options: { A: '.js', B: '.node', C: '.module', D: '.nodejs' },
        answer: 'A',
        explanation: 'Node.js modules often use the .js extension.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'Which method is used to start the server?',
        options: { A: 'server.start()', B: 'server.listen()', C: 'server.run()', D: 'server.startServer()' },
        answer: 'B',
        explanation: 'server.listen() is used to start the server in Node.js.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is the event-driven architecture of Node.js?',
        options: { A: 'A lightweight copy of the real DOM', B: 'A database', C: 'A server', D: 'A CSS framework' },
        answer: 'A',
        explanation: 'Node.js is event-driven, meaning it handles requests asynchronously.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'How do you handle errors in Node.js?',
        options: { A: 'Using try/catch blocks', B: 'Using .catch()', C: 'Using try/catch or .catch()', D: 'Errors cannot be handled' },
        answer: 'C',
        explanation: 'You can handle errors in Node.js using try/catch blocks or .catch() methods.',
        difficulty: 'advanced',
        category: 'best-practice'
      }
    ]
  },
  'SQL': {
    beginner: [
      {
        question: 'What is SQL?',
        options: { A: 'A programming language for databases', B: 'A CSS framework', C: 'A database', D: 'A backend language' },
        answer: 'A',
        explanation: 'SQL is a programming language for databases.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which company developed SQL?',
        options: { A: 'Oracle', B: 'Microsoft', C: 'IBM', D: 'MySQL' },
        answer: 'A',
        explanation: 'SQL was developed by IBM.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a database?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A database is a collection of data.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a table in a database?',
        options: { A: 'A reusable piece of code', B: 'A CSS class', C: 'A database table', D: 'A server' },
        answer: 'C',
        explanation: 'A table is a database table.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which keyword is used to select data from a table?',
        options: { A: 'SELECT', B: 'SELECT *', C: 'SELECT FROM', D: 'SELECT ALL' },
        answer: 'A',
        explanation: 'SELECT is used to select data from a table.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you create a table in SQL?',
        options: { A: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)', B: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)', C: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)', D: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)' },
        answer: 'B',
        explanation: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...) is used to create a table.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'What is a primary key?',
        options: { A: 'A unique identifier for a record', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A primary key is a unique identifier for a record.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'How do you insert data into a table?',
        options: { A: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)', B: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)', C: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)', D: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)' },
        answer: 'A',
        explanation: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...) is used to insert data into a table.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you update data in a table?',
        options: { A: 'UPDATE table_name SET column1 = value1 WHERE condition', B: 'UPDATE table_name SET column1 = value1 WHERE condition', C: 'UPDATE table_name SET column1 = value1 WHERE condition', D: 'UPDATE table_name SET column1 = value1 WHERE condition' },
        answer: 'A',
        explanation: 'UPDATE table_name SET column1 = value1 WHERE condition is used to update data in a table.',
        difficulty: 'beginner',
        category: 'syntax'
      },
      {
        question: 'How do you delete data from a table?',
        options: { A: 'DELETE FROM table_name WHERE condition', B: 'DELETE FROM table_name WHERE condition', C: 'DELETE FROM table_name WHERE condition', D: 'DELETE FROM table_name WHERE condition' },
        answer: 'A',
        explanation: 'DELETE FROM table_name WHERE condition is used to delete data from a table.',
        difficulty: 'beginner',
        category: 'syntax'
      }
    ],
    intermediate: [
      {
        question: 'Which keyword is used to select data from a table?',
        options: { A: 'SELECT', B: 'SELECT *', C: 'SELECT FROM', D: 'SELECT ALL' },
        answer: 'A',
        explanation: 'SELECT is used to select data from a table.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you create a table in SQL?',
        options: { A: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)', B: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)', C: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)', D: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)' },
        answer: 'B',
        explanation: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...) is used to create a table.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'What is a primary key?',
        options: { A: 'A unique identifier for a record', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A primary key is a unique identifier for a record.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'How do you insert data into a table?',
        options: { A: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)', B: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)', C: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)', D: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)' },
        answer: 'A',
        explanation: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...) is used to insert data into a table.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you update data in a table?',
        options: { A: 'UPDATE table_name SET column1 = value1 WHERE condition', B: 'UPDATE table_name SET column1 = value1 WHERE condition', C: 'UPDATE table_name SET column1 = value1 WHERE condition', D: 'UPDATE table_name SET column1 = value1 WHERE condition' },
        answer: 'A',
        explanation: 'UPDATE table_name SET column1 = value1 WHERE condition is used to update data in a table.',
        difficulty: 'intermediate',
        category: 'syntax'
      },
      {
        question: 'How do you delete data from a table?',
        options: { A: 'DELETE FROM table_name WHERE condition', B: 'DELETE FROM table_name WHERE condition', C: 'DELETE FROM table_name WHERE condition', D: 'DELETE FROM table_name WHERE condition' },
        answer: 'A',
        explanation: 'DELETE FROM table_name WHERE condition is used to delete data from a table.',
        difficulty: 'intermediate',
        category: 'syntax'
      }
    ],
    advanced: [
      {
        question: 'Which keyword is used to select data from a table?',
        options: { A: 'SELECT', B: 'SELECT *', C: 'SELECT FROM', D: 'SELECT ALL' },
        answer: 'A',
        explanation: 'SELECT is used to select data from a table.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you create a table in SQL?',
        options: { A: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)', B: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)', C: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)', D: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...)' },
        answer: 'B',
        explanation: 'CREATE TABLE table_name (column1_name column1_type, column2_name column2_type, ...) is used to create a table.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'What is a primary key?',
        options: { A: 'A unique identifier for a record', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A primary key is a unique identifier for a record.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'How do you insert data into a table?',
        options: { A: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)', B: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)', C: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)', D: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...)' },
        answer: 'A',
        explanation: 'INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...) is used to insert data into a table.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you update data in a table?',
        options: { A: 'UPDATE table_name SET column1 = value1 WHERE condition', B: 'UPDATE table_name SET column1 = value1 WHERE condition', C: 'UPDATE table_name SET column1 = value1 WHERE condition', D: 'UPDATE table_name SET column1 = value1 WHERE condition' },
        answer: 'A',
        explanation: 'UPDATE table_name SET column1 = value1 WHERE condition is used to update data in a table.',
        difficulty: 'advanced',
        category: 'syntax'
      },
      {
        question: 'How do you delete data from a table?',
        options: { A: 'DELETE FROM table_name WHERE condition', B: 'DELETE FROM table_name WHERE condition', C: 'DELETE FROM table_name WHERE condition', D: 'DELETE FROM table_name WHERE condition' },
        answer: 'A',
        explanation: 'DELETE FROM table_name WHERE condition is used to delete data from a table.',
        difficulty: 'advanced',
        category: 'syntax'
      }
    ]
  },
  'Data Structures': {
    beginner: [
      {
        question: 'What is a data structure?',
        options: { A: 'A way to organize and store data', B: 'A CSS framework', C: 'A database', D: 'A backend language' },
        answer: 'A',
        explanation: 'A data structure is a way to organize and store data.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which company developed data structures?',
        options: { A: 'Google', B: 'Facebook', C: 'Microsoft', D: 'Joyent' },
        answer: 'A',
        explanation: 'Data structures were developed by Joyent.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is an array?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'An array is a collection of data.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a linked list?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A linked list is a collection of data.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which data structure is used for a stack?',
        options: { A: 'Array', B: 'Linked List', C: 'Queue', D: 'Hash Table' },
        answer: 'A',
        explanation: 'An array is used for a stack.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a queue?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A queue is a collection of data.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which data structure is used for a hash table?',
        options: { A: 'Array', B: 'Linked List', C: 'Queue', D: 'Hash Table' },
        answer: 'D',
        explanation: 'A hash table is a data structure used for a hash table.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a tree?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A tree is a collection of data.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which data structure is used for a graph?',
        options: { A: 'Array', B: 'Linked List', C: 'Queue', D: 'Graph' },
        answer: 'D',
        explanation: 'A graph is a data structure used for a graph.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a binary tree?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A binary tree is a collection of data.',
        difficulty: 'beginner',
        category: 'concept'
      }
    ],
    intermediate: [
      {
        question: 'Which data structure is used for a stack?',
        options: { A: 'Array', B: 'Linked List', C: 'Queue', D: 'Hash Table' },
        answer: 'A',
        explanation: 'An array is used for a stack.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is a queue?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A queue is a collection of data.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which data structure is used for a hash table?',
        options: { A: 'Array', B: 'Linked List', C: 'Queue', D: 'Hash Table' },
        answer: 'D',
        explanation: 'A hash table is a data structure used for a hash table.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is a tree?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A tree is a collection of data.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which data structure is used for a graph?',
        options: { A: 'Array', B: 'Linked List', C: 'Queue', D: 'Graph' },
        answer: 'D',
        explanation: 'A graph is a data structure used for a graph.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is a binary tree?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A binary tree is a collection of data.',
        difficulty: 'intermediate',
        category: 'concept'
      }
    ],
    advanced: [
      {
        question: 'Which data structure is used for a stack?',
        options: { A: 'Array', B: 'Linked List', C: 'Queue', D: 'Hash Table' },
        answer: 'A',
        explanation: 'An array is used for a stack.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is a queue?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A queue is a collection of data.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which data structure is used for a hash table?',
        options: { A: 'Array', B: 'Linked List', C: 'Queue', D: 'Hash Table' },
        answer: 'D',
        explanation: 'A hash table is a data structure used for a hash table.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is a tree?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A tree is a collection of data.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which data structure is used for a graph?',
        options: { A: 'Array', B: 'Linked List', C: 'Queue', D: 'Graph' },
        answer: 'D',
        explanation: 'A graph is a data structure used for a graph.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is a binary tree?',
        options: { A: 'A collection of data', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A binary tree is a collection of data.',
        difficulty: 'advanced',
        category: 'concept'
      }
    ]
  },
  'Algorithms': {
    beginner: [
      {
        question: 'What is an algorithm?',
        options: { A: 'A set of instructions to solve a problem', B: 'A CSS framework', C: 'A database', D: 'A backend language' },
        answer: 'A',
        explanation: 'An algorithm is a set of instructions to solve a problem.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which company developed algorithms?',
        options: { A: 'Google', B: 'Facebook', C: 'Microsoft', D: 'Joyent' },
        answer: 'A',
        explanation: 'Algorithms were developed by Joyent.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a sorting algorithm?',
        options: { A: 'An algorithm that arranges data in a specific order', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A sorting algorithm is an algorithm that arranges data in a specific order.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a searching algorithm?',
        options: { A: 'An algorithm that finds a specific item in a collection', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A searching algorithm is an algorithm that finds a specific item in a collection.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which algorithm is used for binary search?',
        options: { A: 'Bubble Sort', B: 'Binary Search', C: 'Quick Sort', D: 'Merge Sort' },
        answer: 'B',
        explanation: 'Binary search is an algorithm used for binary search.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a greedy algorithm?',
        options: { A: 'An algorithm that makes the best choice at each step', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A greedy algorithm is an algorithm that makes the best choice at each step.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which algorithm is used for depth-first search?',
        options: { A: 'Bubble Sort', B: 'Binary Search', C: 'Quick Sort', D: 'Depth-First Search' },
        answer: 'D',
        explanation: 'Depth-first search is an algorithm used for depth-first search.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a dynamic programming algorithm?',
        options: { A: 'An algorithm that breaks down a problem into smaller sub-problems', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A dynamic programming algorithm is an algorithm that breaks down a problem into smaller sub-problems.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'Which algorithm is used for breadth-first search?',
        options: { A: 'Bubble Sort', B: 'Binary Search', C: 'Quick Sort', D: 'Breadth-First Search' },
        answer: 'D',
        explanation: 'Breadth-first search is an algorithm used for breadth-first search.',
        difficulty: 'beginner',
        category: 'concept'
      },
      {
        question: 'What is a backtracking algorithm?',
        options: { A: 'An algorithm that tries to build solutions incrementally', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A backtracking algorithm is an algorithm that tries to build solutions incrementally.',
        difficulty: 'beginner',
        category: 'concept'
      }
    ],
    intermediate: [
      {
        question: 'Which algorithm is used for binary search?',
        options: { A: 'Bubble Sort', B: 'Binary Search', C: 'Quick Sort', D: 'Merge Sort' },
        answer: 'B',
        explanation: 'Binary search is an algorithm used for binary search.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is a greedy algorithm?',
        options: { A: 'An algorithm that makes the best choice at each step', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A greedy algorithm is an algorithm that makes the best choice at each step.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which algorithm is used for depth-first search?',
        options: { A: 'Bubble Sort', B: 'Binary Search', C: 'Quick Sort', D: 'Depth-First Search' },
        answer: 'D',
        explanation: 'Depth-first search is an algorithm used for depth-first search.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is a dynamic programming algorithm?',
        options: { A: 'An algorithm that breaks down a problem into smaller sub-problems', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A dynamic programming algorithm is an algorithm that breaks down a problem into smaller sub-problems.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'Which algorithm is used for breadth-first search?',
        options: { A: 'Bubble Sort', B: 'Binary Search', C: 'Quick Sort', D: 'Breadth-First Search' },
        answer: 'D',
        explanation: 'Breadth-first search is an algorithm used for breadth-first search.',
        difficulty: 'intermediate',
        category: 'concept'
      },
      {
        question: 'What is a backtracking algorithm?',
        options: { A: 'An algorithm that tries to build solutions incrementally', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A backtracking algorithm is an algorithm that tries to build solutions incrementally.',
        difficulty: 'intermediate',
        category: 'concept'
      }
    ],
    advanced: [
      {
        question: 'Which algorithm is used for binary search?',
        options: { A: 'Bubble Sort', B: 'Binary Search', C: 'Quick Sort', D: 'Merge Sort' },
        answer: 'B',
        explanation: 'Binary search is an algorithm used for binary search.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is a greedy algorithm?',
        options: { A: 'An algorithm that makes the best choice at each step', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A greedy algorithm is an algorithm that makes the best choice at each step.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which algorithm is used for depth-first search?',
        options: { A: 'Bubble Sort', B: 'Binary Search', C: 'Quick Sort', D: 'Depth-First Search' },
        answer: 'D',
        explanation: 'Depth-first search is an algorithm used for depth-first search.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is a dynamic programming algorithm?',
        options: { A: 'An algorithm that breaks down a problem into smaller sub-problems', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A dynamic programming algorithm is an algorithm that breaks down a problem into smaller sub-problems.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'Which algorithm is used for breadth-first search?',
        options: { A: 'Bubble Sort', B: 'Binary Search', C: 'Quick Sort', D: 'Breadth-First Search' },
        answer: 'D',
        explanation: 'Breadth-first search is an algorithm used for breadth-first search.',
        difficulty: 'advanced',
        category: 'concept'
      },
      {
        question: 'What is a backtracking algorithm?',
        options: { A: 'An algorithm that tries to build solutions incrementally', B: 'A CSS preprocessor', C: 'A database query language', D: 'A server-side language' },
        answer: 'A',
        explanation: 'A backtracking algorithm is an algorithm that tries to build solutions incrementally.',
        difficulty: 'advanced',
        category: 'concept'
      }
    ]
  }
};

export const getQuizFromBank = (topic: string, difficulty: string, count: number = 5): QuizQuestion[] => {
  const topicBank = quizBank[topic];
  if (!topicBank) {
    return [];
  }

  const difficultyQuestions = topicBank[difficulty] || topicBank['beginner'] || [];
  
  // Shuffle the questions and return the requested count
  const shuffled = [...difficultyQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getAvailableTopics = (): string[] => {
  return Object.keys(quizBank);
};

export const getAvailableDifficulties = (): string[] => {
  return ['beginner', 'intermediate', 'advanced'];
}; 