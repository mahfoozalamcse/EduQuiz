
// Types
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number; // in minutes
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number; // Percentage
  timeTaken: number; // in seconds
  date: string; // ISO date string
  completed: boolean;
  answers: number[]; // Indexes of selected options
  attendanceMarked: boolean;
}

// Mock quizzes
export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Computer Networks Fundamentals',
    subject: 'Computer Networks',
    description: 'Test your knowledge of computer network fundamentals including OSI model, TCP/IP, and basic network topologies.',
    duration: 45,
    difficulty: 'easy',
    questions: [
      {
        id: '1-1',
        text: 'Which layer of the OSI model is responsible for routing and forwarding?',
        options: ['Transport Layer', 'Network Layer', 'Data Link Layer', 'Physical Layer'],
        correctAnswer: 1
      },
      {
        id: '1-2',
        text: 'What protocol is used to convert IP addresses to MAC addresses?',
        options: ['DHCP', 'DNS', 'ARP', 'HTTP'],
        correctAnswer: 2
      },
      {
        id: '1-3',
        text: 'Which network topology connects each device to a central hub?',
        options: ['Mesh', 'Star', 'Ring', 'Bus'],
        correctAnswer: 1
      },
      {
        id: '1-4',
        text: 'What is the maximum data rate of standard Ethernet?',
        options: ['10 Mbps', '100 Mbps', '1 Gbps', 'All of the above depending on the standard'],
        correctAnswer: 3
      },
      {
        id: '1-5',
        text: 'Which protocol is connection-oriented?',
        options: ['UDP', 'TCP', 'ICMP', 'IP'],
        correctAnswer: 1
      },
      {
        id: '1-6',
        text: 'Which device operates at the Data Link layer of the OSI model?',
        options: ['Router', 'Switch', 'Hub', 'Modem'],
        correctAnswer: 1
      },
      {
        id: '1-7',
        text: 'Which protocol assigns IP addresses automatically to devices?',
        options: ['DNS', 'HTTP', 'DHCP', 'FTP'],
        correctAnswer: 2
      },
      {
        id: '1-8',
        text: 'Which of these is a private IP address?',
        options: ['192.168.1.1', '8.8.8.8', '172.32.0.1', '100.100.100.100'],
        correctAnswer: 0
      },
      {
        id: '1-9',
        text: 'Which layer handles error detection and correction?',
        options: ['Network Layer', 'Transport Layer', 'Data Link Layer', 'Application Layer'],
        correctAnswer: 2
      },
      {
        id: '1-10',
        text: 'What is the full form of HTTP?',
        options: ['HyperText Transfer Protocol', 'HighText Transfer Protocol', 'HyperTerminal Transfer Protocol', 'None of the above'],
        correctAnswer: 0
      },
      {
        id: '1-11',
        text: 'Which of the following uses a three-way handshake?',
        options: ['TCP', 'UDP', 'ICMP', 'IP'],
        correctAnswer: 0
      },
      {
        id: '1-12',
        text: 'What is the purpose of a subnet mask?',
        options: ['To divide the network into sub-networks', 'To hide IP addresses', 'To detect errors', 'To route packets'],
        correctAnswer: 0
      },
      {
        id: '1-13',
        text: 'Which command can be used to test network connectivity?',
        options: ['ipconfig', 'ping', 'mkdir', 'nslookup'],
        correctAnswer: 1
      },
      {
        id: '1-14',
        text: 'Which of the following is NOT a valid class of IP addresses?',
        options: ['Class A', 'Class B', 'Class D', 'Class F'],
        correctAnswer: 3
      },
      {
        id: '1-15',
        text: 'Which protocol is used for secure communication over the Internet?',
        options: ['HTTP', 'SSL', 'FTP', 'TCP'],
        correctAnswer: 1
      },
      {
        id: '1-16',
        text: 'Which port number is used by HTTP?',
        options: ['80', '443', '21', '25'],
        correctAnswer: 0
      },
      {
        id: '1-17',
        text: 'Which device is used to break up broadcast domains?',
        options: ['Router', 'Switch', 'Hub', 'Repeater'],
        correctAnswer: 0
      },
      {
        id: '1-18',
        text: 'Which layer of OSI is responsible for encryption and compression?',
        options: ['Transport', 'Session', 'Presentation', 'Application'],
        correctAnswer: 2
      },
      {
        id: '1-19',
        text: 'What is the default subnet mask for a Class C IP address?',
        options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'],
        correctAnswer: 2
      },
      {
        id: '1-20',
        text: 'What is the purpose of DNS?',
        options: ['Assign IP addresses', 'Resolve domain names to IP addresses', 'Secure connections', 'Control packet routing'],
        correctAnswer: 1
      },
      {
        id: '1-21',
        text: 'Which layer ensures reliable data transfer?',
        options: ['Network', 'Transport', 'Session', 'Presentation'],
        correctAnswer: 1
      },
      {
        id: '1-22',
        text: 'Which protocol does ping use?',
        options: ['TCP', 'UDP', 'ICMP', 'HTTP'],
        correctAnswer: 2
      },
      {
        id: '1-23',
        text: 'Which topology has a single point of failure?',
        options: ['Star', 'Ring', 'Mesh', 'Tree'],
        correctAnswer: 0
      },
      {
        id: '1-24',
        text: 'What is the size of an IPv4 address?',
        options: ['32 bits', '64 bits', '128 bits', '16 bits'],
        correctAnswer: 0
      },
      {
        id: '1-25',
        text: 'Which device operates at both Layer 2 and Layer 3 of the OSI model?',
        options: ['Hub', 'Router', 'Switch', 'Layer 3 Switch'],
        correctAnswer: 3
      },
      {
        id: '1-26',
        text: 'What is a MAC address?',
        options: ['An IP address', 'A physical hardware address', 'A DNS name', 'A subnet mask'],
        correctAnswer: 1
      },
      {
        id: '1-27',
        text: 'Which OSI layer provides the interface to the user?',
        options: ['Session', 'Presentation', 'Application', 'Transport'],
        correctAnswer: 2
      },
      {
        id: '1-28',
        text: 'Which of the following is a connectionless protocol?',
        options: ['TCP', 'UDP', 'FTP', 'Telnet'],
        correctAnswer: 1
      },
      {
        id: '1-29',
        text: 'Which device regenerates signals in a network?',
        options: ['Router', 'Switch', 'Repeater', 'Bridge'],
        correctAnswer: 2
      },
      {
        id: '1-30',
        text: 'Which network device works only in the physical layer?',
        options: ['Router', 'Switch', 'Hub', 'Bridge'],
        correctAnswer: 2
      }
    ]
  }
  
  ,
  {
    id: '2',
    title: 'Data Structures: Arrays & Linked Lists',
    subject: 'Data Structures',
    description: 'Test your understanding of basic data structures including arrays, linked lists, and their operations.',
    duration: 20,
    difficulty: 'medium',
    questions: [
      {
        id: '2-1',
        text: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 0
      },
      {
        id: '2-2',
        text: 'In a singly linked list, what operation has O(n) time complexity?',
        options: ['Insertion at beginning', 'Deletion at beginning', 'Accessing the last element', 'All of the above'],
        correctAnswer: 2
      },
      {
        id: '2-3',
        text: 'Which data structure is more memory efficient?',
        options: ['Array', 'Linked List', 'Both use the same amount', 'Depends on implementation'],
        correctAnswer: 3
      },
      {
        id: '2-4',
        text: 'What is the main advantage of a doubly linked list over a singly linked list?',
        options: [
          'Faster insertion at the beginning', 
          'Bidirectional traversal', 
          'Less memory usage', 
          'Better for random access'
        ],
        correctAnswer: 1
      },
      {
        id: '2-5',
        text: 'What problem might arise when using arrays with dynamic sizing?',
        options: [
          'Memory fragmentation', 
          'Stack overflow', 
          'High cost of resizing operations', 
          'All of the above'
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: '3',
    title: 'Operating Systems: Processes & Threads',
    subject: 'Operating Systems',
    description: 'Test your knowledge of operating system concepts including processes, threads, scheduling, and memory management.',
    duration: 25,
    difficulty: 'hard',
    questions: [
      {
        id: '3-1',
        text: 'What resource is typically shared between threads of the same process?',
        options: ['Register values', 'Stack', 'Heap memory', 'Process ID'],
        correctAnswer: 2
      },
      {
        id: '3-2',
        text: 'Which scheduling algorithm might lead to starvation?',
        options: ['Round Robin', 'First Come First Served', 'Priority Scheduling', 'Shortest Job First'],
        correctAnswer: 2
      },
      {
        id: '3-3',
        text: 'In virtual memory management, what is a page fault?',
        options: [
          'A corrupted page table', 
          'Accessing a page not currently in physical memory', 
          'A page with access permission violation', 
          'A full page table'
        ],
        correctAnswer: 1
      },
      {
        id: '3-4',
        text: 'What is the purpose of a mutex in multithreaded programming?',
        options: [
          'To prevent race conditions', 
          'To optimize thread scheduling', 
          'To allocate memory for threads', 
          'To terminate unused threads'
        ],
        correctAnswer: 0
      },
      {
        id: '3-5',
        text: 'Which of these is not a state in the typical process state diagram?',
        options: ['Ready', 'Running', 'Waiting', 'Compiling'],
        correctAnswer: 3
      }
    ]
  },
  {
    id: '4',
    title: 'Software Engineering Principles',
    subject: 'Software Engineering',
    description: 'Test your understanding of software engineering concepts including development methodologies, design patterns, and best practices.',
    duration: 20,
    difficulty: 'medium',
    questions: [
      {
        id: '4-1',
        text: 'Which of these is not an Agile methodology?',
        options: ['Scrum', 'Kanban', 'Waterfall', 'Extreme Programming'],
        correctAnswer: 2
      },
      {
        id: '4-2',
        text: 'What design pattern provides a simplified interface to a complex subsystem?',
        options: ['Adapter', 'Facade', 'Decorator', 'Proxy'],
        correctAnswer: 1
      },
      {
        id: '4-3',
        text: 'Which principle states that "software entities should be open for extension, but closed for modification"?',
        options: ['Single Responsibility Principle', 'Open/Closed Principle', 'Liskov Substitution Principle', 'Interface Segregation Principle'],
        correctAnswer: 1
      },
      {
        id: '4-4',
        text: 'What is the primary purpose of version control systems?',
        options: [
          'To manage project dependencies', 
          'To track and manage changes to code over time', 
          'To automate testing procedures', 
          'To document APIs'
        ],
        correctAnswer: 1
      },
      {
        id: '4-5',
        text: 'Which of these is not typically part of Continuous Integration?',
        options: [
          'Automated building', 
          'Automated testing', 
          'Manual code reviews', 
          'Reporting build results'
        ],
        correctAnswer: 2
      }
    ]
  }
];

// Mock quiz attempts for the student user
export const quizAttempts: QuizAttempt[] = [
  {
    id: '1a',
    quizId: '1',
    userId: '1', // student
    score: 80,
    timeTaken: 720, // 12 minutes
    date: '2023-10-15T14:30:00Z',
    completed: true,
    answers: [1, 2, 1, 3, 0],
    attendanceMarked: true
  },
  {
    id: '2a',
    quizId: '2',
    userId: '1', // student
    score: 60,
    timeTaken: 1080, // 18 minutes
    date: '2023-10-17T10:15:00Z',
    completed: true,
    answers: [0, 3, 1, 1, 2],
    attendanceMarked: true
  },
  {
    id: '3a',
    quizId: '3',
    userId: '1', // student
    score: 40,
    timeTaken: 1320, // 22 minutes
    date: '2023-10-20T16:45:00Z',
    completed: true,
    answers: [1, 2, 1, 3, 2],
    attendanceMarked: false
  }
];

// Get quizzes for a user
export const getUserQuizzes = (userId: string) => {
  // In a real app, this would filter based on enrolled courses, etc.
  // For demo, return all quizzes
  return quizzes;
};

// Get quiz attempts for a user
export const getUserQuizAttempts = (userId: string) => {
  return quizAttempts.filter(attempt => attempt.userId === userId);
};

// Get a specific quiz by ID
export const getQuizById = (quizId: string) => {
  return quizzes.find(quiz => quiz.id === quizId);
};

// Get quiz attempt by ID
export const getQuizAttemptById = (attemptId: string) => {
  return quizAttempts.find(attempt => attempt.id === attemptId);
};

// Add a new quiz attempt
export const addQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'attendanceMarked'>) => {
  const newAttempt: QuizAttempt = {
    ...attempt,
    id: `${quizAttempts.length + 1}a`,
    attendanceMarked: attempt.score >= 60 // Mark attendance if score is 60% or above
  };
  
  quizAttempts.push(newAttempt);
  return newAttempt;
};
