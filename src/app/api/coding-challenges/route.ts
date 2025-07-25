import { NextRequest, NextResponse } from 'next/server'

interface CodingChallenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  language: string
  category: string
  starterCode: string
  solution: string
  testCases: TestCase[]
  hints: string[]
  explanation: string
  timeLimit?: number
  memoryLimit?: number
  tags: string[]
}

interface TestCase {
  id: string
  input: string
  expectedOutput: string
  isHidden: boolean
  description?: string
}

// Sample coding challenges database
const codingChallenges: CodingChallenge[] = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'beginner',
    language: 'JavaScript',
    category: 'Arrays',
    starterCode: `function twoSum(nums, target) {
    // Your code here
    
}

// Test your function
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]`,
    solution: `function twoSum(nums, target) {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return [];
}`,
    testCases: [
      {
        id: '1',
        input: '[2, 7, 11, 15], 9',
        expectedOutput: '[0, 1]',
        isHidden: false,
        description: 'Basic case with target sum at beginning'
      },
      {
        id: '2',
        input: '[3, 2, 4], 6',
        expectedOutput: '[1, 2]',
        isHidden: false,
        description: 'Target sum in middle'
      },
      {
        id: '3',
        input: '[3, 3], 6',
        expectedOutput: '[0, 1]',
        isHidden: true,
        description: 'Duplicate numbers'
      }
    ],
    hints: [
      'Think about using a hash map to store numbers you\'ve seen',
      'For each number, check if its complement (target - number) exists in the map',
      'Remember to store the index, not just the number'
    ],
    explanation: 'This solution uses a hash map to store numbers and their indices as we iterate through the array. For each number, we calculate its complement and check if it exists in our map. This gives us O(n) time complexity.',
    timeLimit: 1000,
    memoryLimit: 256,
    tags: ['arrays', 'hash-map', 'two-pointers']
  },
  {
    id: '2',
    title: 'Reverse String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    difficulty: 'beginner',
    language: 'JavaScript',
    category: 'Strings',
    starterCode: `function reverseString(s) {
    // Your code here
    // Modify the array in-place
    
}

// Test your function
let testArray = ['h', 'e', 'l', 'l', 'o'];
reverseString(testArray);
console.log(testArray); // Expected: ['o', 'l', 'l', 'e', 'h']`,
    solution: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Swap characters
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}`,
    testCases: [
      {
        id: '1',
        input: "['h', 'e', 'l', 'l', 'o']",
        expectedOutput: "['o', 'l', 'l', 'e', 'h']",
        isHidden: false,
        description: 'Basic string reversal'
      },
      {
        id: '2',
        input: "['H', 'a', 'n', 'n', 'a', 'h']",
        expectedOutput: "['h', 'a', 'n', 'n', 'a', 'H']",
        isHidden: false,
        description: 'Palindrome-like string'
      },
      {
        id: '3',
        input: "['a']",
        expectedOutput: "['a']",
        isHidden: true,
        description: 'Single character'
      }
    ],
    hints: [
      'Use two pointers approach - one at the start, one at the end',
      'Swap characters and move pointers towards each other',
      'Continue until pointers meet in the middle'
    ],
    explanation: 'This solution uses the two-pointers technique. We place one pointer at the beginning and another at the end, swap the characters, and move the pointers towards each other until they meet.',
    timeLimit: 1000,
    memoryLimit: 256,
    tags: ['strings', 'two-pointers', 'in-place']
  },
  {
    id: '3',
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'intermediate',
    language: 'JavaScript',
    category: 'Stack',
    starterCode: `function isValid(s) {
    // Your code here
    
}

// Test your function
console.log(isValid("()")); // Expected: true
console.log(isValid("()[]{}")); // Expected: true
console.log(isValid("(]")); // Expected: false`,
    solution: `function isValid(s) {
    const stack = [];
    const mapping = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in mapping) {
            // Closing bracket
            if (stack.length === 0 || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            // Opening bracket
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
    testCases: [
      {
        id: '1',
        input: '"()"',
        expectedOutput: 'true',
        isHidden: false,
        description: 'Simple valid parentheses'
      },
      {
        id: '2',
        input: '"()[]{}"',
        expectedOutput: 'true',
        isHidden: false,
        description: 'Multiple types of brackets'
      },
      {
        id: '3',
        input: '"(]"',
        expectedOutput: 'false',
        isHidden: false,
        description: 'Invalid bracket pairing'
      },
      {
        id: '4',
        input: '"((("',
        expectedOutput: 'false',
        isHidden: true,
        description: 'Only opening brackets'
      }
    ],
    hints: [
      'Think about using a stack data structure',
      'Push opening brackets onto the stack',
      'When you see a closing bracket, check if it matches the most recent opening bracket'
    ],
    explanation: 'This problem is perfect for a stack data structure. We push opening brackets onto the stack and when we encounter a closing bracket, we check if it matches the most recently opened bracket (top of stack).',
    timeLimit: 1000,
    memoryLimit: 256,
    tags: ['stack', 'strings', 'brackets']
  },
  {
    id: '4',
    title: 'Fibonacci Sequence',
    description: 'Write a function to calculate the nth Fibonacci number. The Fibonacci sequence starts with 0, 1, and each subsequent number is the sum of the previous two.',
    difficulty: 'beginner',
    language: 'JavaScript',
    category: 'Dynamic Programming',
    starterCode: `function fibonacci(n) {
    // Your code here
    
}

// Test your function
console.log(fibonacci(0)); // Expected: 0
console.log(fibonacci(1)); // Expected: 1
console.log(fibonacci(5)); // Expected: 5
console.log(fibonacci(10)); // Expected: 55`,
    solution: `function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    
    let prev = 0;
    let curr = 1;
    
    for (let i = 2; i <= n; i++) {
        let next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}`,
    testCases: [
      {
        id: '1',
        input: '0',
        expectedOutput: '0',
        isHidden: false,
        description: 'Base case: F(0)'
      },
      {
        id: '2',
        input: '1',
        expectedOutput: '1',
        isHidden: false,
        description: 'Base case: F(1)'
      },
      {
        id: '3',
        input: '5',
        expectedOutput: '5',
        isHidden: false,
        description: 'Small Fibonacci number'
      },
      {
        id: '4',
        input: '10',
        expectedOutput: '55',
        isHidden: true,
        description: 'Larger Fibonacci number'
      }
    ],
    hints: [
      'Handle base cases: F(0) = 0, F(1) = 1',
      'Use iteration instead of recursion for better performance',
      'Keep track of the previous two numbers as you iterate'
    ],
    explanation: 'This iterative solution avoids the exponential time complexity of naive recursion. We keep track of the previous two Fibonacci numbers and calculate the next one in each iteration.',
    timeLimit: 1000,
    memoryLimit: 256,
    tags: ['dynamic-programming', 'iteration', 'math']
  },
  {
    id: '5',
    title: 'Binary Search',
    description: 'Implement binary search algorithm. Given a sorted array and a target value, return the index of the target if found, otherwise return -1.',
    difficulty: 'intermediate',
    language: 'JavaScript',
    category: 'Search Algorithms',
    starterCode: `function binarySearch(nums, target) {
    // Your code here
    
}

// Test your function
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 4)); // Expected: 3
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 8)); // Expected: -1`,
    solution: `function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
    testCases: [
      {
        id: '1',
        input: '[1, 2, 3, 4, 5, 6, 7], 4',
        expectedOutput: '3',
        isHidden: false,
        description: 'Target found in middle'
      },
      {
        id: '2',
        input: '[1, 2, 3, 4, 5, 6, 7], 1',
        expectedOutput: '0',
        isHidden: false,
        description: 'Target at beginning'
      },
      {
        id: '3',
        input: '[1, 2, 3, 4, 5, 6, 7], 8',
        expectedOutput: '-1',
        isHidden: false,
        description: 'Target not found'
      },
      {
        id: '4',
        input: '[], 1',
        expectedOutput: '-1',
        isHidden: true,
        description: 'Empty array'
      }
    ],
    hints: [
      'Use two pointers: left and right to define the search range',
      'Calculate the middle index and compare with target',
      'Eliminate half of the search space in each iteration'
    ],
    explanation: 'Binary search works by repeatedly dividing the search space in half. We compare the middle element with our target and eliminate the half that cannot contain the target.',
    timeLimit: 1000,
    memoryLimit: 256,
    tags: ['binary-search', 'algorithms', 'divide-and-conquer']
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty')
    const language = searchParams.get('language')
    const category = searchParams.get('category')
    const challengeId = searchParams.get('id')

    // If requesting a specific challenge
    if (challengeId) {
      const challenge = codingChallenges.find(c => c.id === challengeId)
      if (!challenge) {
        return NextResponse.json({ success: false, error: 'Challenge not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: challenge })
    }

    // Filter challenges based on query parameters
    let filteredChallenges = codingChallenges

    if (difficulty) {
      filteredChallenges = filteredChallenges.filter(c => c.difficulty === difficulty)
    }

    if (language) {
      filteredChallenges = filteredChallenges.filter(c => c.language === language)
    }

    if (category) {
      filteredChallenges = filteredChallenges.filter(c => c.category === category)
    }

    // Return challenges without solutions for security
    const challengesWithoutSolutions = filteredChallenges.map(challenge => ({
      ...challenge,
      solution: undefined // Don't send solution to client
    }))

    return NextResponse.json({ 
      success: true, 
      data: challengesWithoutSolutions,
      total: challengesWithoutSolutions.length
    })
  } catch (error) {
    console.error('Error fetching coding challenges:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch coding challenges' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { challengeId, userCode, action } = body

    if (action === 'submit') {
      // Find the challenge
      const challenge = codingChallenges.find(c => c.id === challengeId)
      if (!challenge) {
        return NextResponse.json({ success: false, error: 'Challenge not found' }, { status: 404 })
      }

      // Run test cases
      const results = []
      let allPassed = true

      for (const testCase of challenge.testCases) {
        try {
          // Create a safe execution environment
          const testFunction = new Function('userCode', `
            ${userCode}
            
            // Extract function name from user code
            const functionMatch = userCode.match(/function\\s+(\\w+)\\s*\\(/);
            if (!functionMatch) {
              throw new Error('No function found in code');
            }
            const functionName = functionMatch[1];
            
            // Execute the test
            const args = [${testCase.input}];
            const result = eval(functionName + '(' + args.map(arg => JSON.stringify(arg)).join(', ') + ')');
            return result;
          `)

          const result = testFunction(userCode)
          const expected = JSON.parse(testCase.expectedOutput)
          const passed = JSON.stringify(result) === JSON.stringify(expected)

          results.push({
            testCaseId: testCase.id,
            passed,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: JSON.stringify(result),
            description: testCase.description,
            isHidden: testCase.isHidden
          })

          if (!passed) allPassed = false

        } catch (error: any) {
          results.push({
            testCaseId: testCase.id,
            passed: false,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: `Error: ${error.message}`,
            description: testCase.description,
            isHidden: testCase.isHidden,
            error: error.message
          })
          allPassed = false
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          allPassed,
          results,
          totalTests: challenge.testCases.length,
          passedTests: results.filter(r => r.passed).length,
          solution: allPassed ? challenge.solution : undefined,
          explanation: allPassed ? challenge.explanation : undefined
        }
      })
    }

    if (action === 'run') {
      // Just run the code without test cases for testing
      try {
        // Create a safe execution environment for running user code
        const output: string[] = []
        const originalConsoleLog = console.log
        
        // Capture console.log output
        console.log = (...args: any[]) => {
          output.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '))
        }

        // Execute user code
        eval(userCode)
        
        // Restore console.log
        console.log = originalConsoleLog

        return NextResponse.json({
          success: true,
          data: {
            output: output.join('\n') || 'Code executed successfully (no output)'
          }
        })
      } catch (error: any) {
        return NextResponse.json({
          success: true,
          data: {
            output: `Error: ${error.message}`
          }
        })
      }
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error processing coding challenge:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process request' 
    }, { status: 500 })
  }
}
